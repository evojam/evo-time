package com.evojam.services.calendar

import com.evojam.models.Calendar
import com.google.inject.Inject
import play.api.Configuration
import play.api.libs.ws.WSClient

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

final class CalendarServiceImpl @Inject() (
  ws: WSClient,
  config: Configuration
) extends CalendarService {

  private val fullUrl: String = url + "?key=" + config.get[String]("calendar.token")

  override def getHolidays(year: Int): Future[Map[String, Seq[String]]] =
    ws.url(fullUrl).get().map {
      case res if res.status == 200 =>
        res.json.as[Seq[Calendar]]
          .filter(_.date.getYear == year)
          .groupBy(_.date.toString).mapValues(_.map(_.name))
      case _ => Map.empty[String, Seq[String]]
    }
}
