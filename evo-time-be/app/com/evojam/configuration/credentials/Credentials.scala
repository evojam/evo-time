package com.evojam.configuration.credentials

import play.api.libs.json.Json

final case class Credentials(url: String, user: String, token: String)

object Credentials {
  implicit val reads = Json.reads[Credentials]
}
