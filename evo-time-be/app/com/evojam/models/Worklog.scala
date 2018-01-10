package com.evojam.models

import play.api.libs.json.Json

case class Worklog(
  username: String,
  displayName: String,
  worklogs: Seq[WorklogInfo]
)

object Worklog {
  implicit val writes = Json.writes[Worklog]
}
