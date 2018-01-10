package com.evojam.models

import play.api.libs.functional.syntax._
import play.api.libs.json._

case class Project(id: Int, name: String)

object Project {
  implicit val reads = (
    (__ \ 'id).read[String].map(_.toInt) ~
    (__ \ 'name).read[String]
  )(Project.apply _)

  implicit val writes = Json.writes[Project]
}
