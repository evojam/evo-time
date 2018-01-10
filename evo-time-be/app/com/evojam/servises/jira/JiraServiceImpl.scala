package com.evojam.servises.jira
import com.evojam.configuration.credentials.Credentials
import com.evojam.models.Project
import com.google.inject.Inject
import play.api.libs.ws.{WSAuthScheme, WSClient, WSResponse}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class JiraServiceImpl @Inject() (ws: WSClient, creds: Credentials) extends JiraService {

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

}
