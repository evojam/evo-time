package com.evojam.models

import play.api.libs.functional.syntax._
import play.api.libs.json._

case class Issue(key: String, description: String)

object Issue {
  implicit val reads = (
    (__ \ 'key).read[String] ~
    (__ \ 'summary).read[String]
    )(Issue.apply _)

  implicit val writes = Json.writes[Issue]

}
