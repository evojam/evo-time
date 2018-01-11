package com.evojam.servises.jira

import java.time.LocalDate

import com.evojam.configuration.credentials.Credentials
import com.evojam.models.{Project, Worklog}

import scala.concurrent.Future

trait JiraService {

  def setJiraCreds(credentials: Credentials): Future[Unit]

  def getJiraCreds(): Future[Seq[String]]

  def removeJiraCreds(url: String): Future[Unit]

  protected def getProjectById(creds: Credentials, id: Int): Future[Option[Project]]

  def getWorklogs(from: LocalDate, to: LocalDate): Future[Map[String, Worklog]]
}
