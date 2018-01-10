package com.evojam.servises.jira

import com.evojam.models.Project
import play.api.libs.ws.WSClient

import scala.concurrent.Future

trait JiraService {
  def getProjectById(id: Int): Future[Option[Project]]
}
