package com.evojam.services.jira

import java.time.LocalDate

import com.evojam.configuration.credentials.Credentials
import com.evojam.models.{Project, Worklog}
import com.evojam.models.dto.WorklogDto
import com.google.inject.Inject
import play.api.cache.AsyncCacheApi
import play.api.libs.ws.{WSAuthScheme, WSClient, WSResponse}
import com.evojam.utils.StringNormalization.normalizer

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

class JiraServiceImpl @Inject()(
  ws: WSClient,
  cache: AsyncCacheApi
) extends JiraService {

  private val key = "credentials"

  override def setJiraCreds(credentials: Credentials): Future[Unit] =
    cache.get[Map[String, Credentials]](key).flatMap {
      case Some(creds) =>
        cache.set(key, creds + (credentials.url -> credentials))
      case None => cache.set(key, Map(credentials.url -> credentials))
    }.map(_ => ())

  override def getJiraCreds(): Future[Seq[String]] = getCreds().map(_.map(_.url))

  override def removeJiraCreds(url: String): Future[Unit] =
    cache.get[Map[String, Credentials]](key).flatMap {
      case Some(creds) if creds.contains(url) => cache.set(key, creds - url).map(_ => ())
      case _ => Future.successful(())
    }

  private def getCreds(): Future[Seq[Credentials]] = {
    cache.get[Map[String, Credentials]](key).map(_.map(_.values.toSeq).getOrElse(Nil))
  }

  private def makeCall(creds: Credentials, path: String): Future[WSResponse] =
    ws.url(creds.url + path)
      .withAuth(creds.user, creds.token, WSAuthScheme.BASIC)
      .addHttpHeaders("Accept" -> "application/json")
      .get()

  override def getProjectById(creds: Credentials, id: Int): Future[Option[Project]] =
    makeCall(creds, "/rest/api/2/project/" + id).map {
      case res: WSResponse if res.status == 200 => res.json.validate[Project].asOpt
      case _ => None
    }

  def getWorklogsWithProject(creds: Credentials, worklogs: Seq[WorklogDto]): Future[Seq[Worklog]] = {
    val ids = worklogs.map(_.projectId).distinct
    Future.sequence(ids.map(getProjectById(creds, _))).map(_.flatten).map { projects =>
      worklogs.map(log => log.copy(project = projects.find(_.id == log.projectId)))
        .groupBy(log => (log.username, log.displayName.normalize))
        .map {
          case ((username, displayName), logs) =>
            Worklog(username, displayName, logs.headOption.flatMap(_.avatar), logs.map(_.toInfo))
        }.toSeq
    }
  }

  override def getWorklogs(from: LocalDate, to: LocalDate): Future[Map[String, Worklog]] = {
    getCreds().flatMap { creds =>
      Future.sequence {
        creds.map { cred =>
          makeCall(cred, s"/rest/tempo-timesheets/3/worklogs?dateFrom=$from&dateTo=$to").map((cred, _))
        }
      }.flatMap { ps =>
        Future.sequence {
          ps.map {
            case (c, res) if res.status == 200 => getWorklogsWithProject(c, res.json.as[Seq[WorklogDto]])
            case _ => Future.successful(Nil)
          }
        }
      }
    }.map {
      _.flatten
        .groupBy(_.username)
        .mapValues(_.reduce((a, b) => a.copy(worklogs = a.worklogs ++ b.worklogs)))
    }
  }

}
