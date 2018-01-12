package com.evojam.models

import java.time._

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Calendar(
  date: OffsetDateTime,
  name: String
)

object Calendar {
  private implicit val calendarReads: Reads[Calendar] = (
    (__ \ 'start \ 'date).read[LocalDate].map(_.atStartOfDay().atOffset(ZoneOffset.UTC)) ~
    (__ \ 'summary).read[String]
  )(Calendar.apply _)

  implicit val reads: Reads[Seq[Calendar]] = (__ \ 'items).read(Reads.seq[Calendar])
}
