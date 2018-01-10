package com.evojam.servises.jira

import java.time.LocalDate

import com.evojam.models.{Project, Worklog}

import scala.concurrent.Future

trait JiraService {
  def getProjectById(id: Int): Future[Option[Project]]

  def getWorklogs(from: LocalDate, to: LocalDate): Future[Map[String, Worklog]]
}
