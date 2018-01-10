package com.evojam.models

import java.time.LocalDateTime

import play.api.libs.json.Json

case class WorklogInfo(
  date: LocalDateTime,
  timeSpentInSeconds: Int,
  issue: Issue,
  project: Option[Project]
)

object WorklogInfo {
  implicit val writes = Json.writes[WorklogInfo]
}
