package com.evojam.services.calendar

import java.time.LocalDateTime

import scala.concurrent.Future

trait CalendarService {
  protected val url =
    "https://www.googleapis.com/calendar/v3/calendars/en.polish%23holiday%40group.v.calendar.google.com/events"
  def getHolidays(): Future[Map[String, Seq[String]]]
}
