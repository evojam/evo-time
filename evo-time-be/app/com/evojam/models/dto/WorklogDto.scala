package com.evojam.models.dto

import java.time.LocalDateTime

import com.evojam.models.{Issue, Project, WorklogInfo}
import play.api.libs.functional.syntax._
import play.api.libs.json._

case class WorklogDto(
  username: String,
  displayName: String,
  avatar: Option[String],
  date: LocalDateTime,
  timeSpentInSeconds: Int,
  issue: Issue,
  projectId: Int,
  project: Option[Project]
) {
  def toInfo: WorklogInfo = WorklogInfo(date, timeSpentInSeconds, issue, project)
}

object WorklogDto {

  private def default(
    username: String,
    displayName: String,
    avatar: Option[String],
    date: LocalDateTime,
    timeSpentInSeconds: Int,
    issue: Issue,
    projectId: Int
  ) = WorklogDto(username, displayName, avatar, date, timeSpentInSeconds, issue, projectId, None)

  implicit val reads = (
    (__ \ 'author \ 'name).read[String] ~
    (__ \ 'author \ 'displayName).read[String] ~
    (__ \ 'author \ 'avatar).readNullable[String] ~
    (__ \ 'dateStarted).read[LocalDateTime] ~
    (__ \ 'timeSpentSeconds).read[Int] ~
    (__ \ 'issue).read[Issue] ~
    (__ \ 'issue \ 'projectId).read[Int]
  )(WorklogDto.default _)

}
