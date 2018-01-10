package com.evojam.servises.jira

import java.time.LocalDate

import com.evojam.configuration.credentials.Credentials
import com.evojam.models.{Project, Worklog}
import com.evojam.models.dto.WorklogDto
import com.google.inject.Inject
import play.api.libs.ws.{WSAuthScheme, WSClient, WSResponse}

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

class JiraServiceImpl @Inject()(ws: WSClient, creds: Credentials) extends JiraService {

  private def restCall(path: String): Future[WSResponse] =
    ws.url(creds.url + path)
      .withAuth(creds.user, creds.token, WSAuthScheme.BASIC)
      .addHttpHeaders("Accept" -> "application/json")
      .get()

  override def getProjectById(id: Int): Future[Option[Project]] =
    restCall("/rest/api/2/project/" + id).map {
      case res: WSResponse if res.status == 200 => res.json.validate[Project].asOpt
      case _ => None
    }

  override def getWorklogs(from: LocalDate, to: LocalDate): Future[Map[String, Worklog]] = {
    restCall(s"/rest/tempo-timesheets/3/worklogs?dateFrom=$from&dateTo=$to").flatMap {
      case res: WSResponse if res.status == 200 =>
        val wlogs = res.json.as[Seq[WorklogDto]]
        val ids = wlogs.map(_.projectId).distinct
        Future.sequence(ids.map(getProjectById)).map(_.flatten).map { projects =>
          wlogs.map(log => log.copy(project = projects.find(_.id == log.projectId)))
            .groupBy(log => (log.username, log.displayName))
            .map {
              case ((username, displayName), logs) => username -> Worklog(username, displayName, logs.map(_.toInfo))
            }
        }

      case _ => Future.successful(Map.empty[String, Worklog])
    }
  }

}
