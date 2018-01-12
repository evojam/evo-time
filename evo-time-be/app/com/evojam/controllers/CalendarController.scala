package com.evojam.controllers

import com.evojam.services.calendar.CalendarService
import com.google.inject._
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
final class CalendarController @Inject() (
  cc: ControllerComponents,
  calendar: CalendarService
) extends AbstractController(cc) {
  def getHolidays() = Action.async { _ =>
    calendar.getHolidays().map {
      case xs if xs.isEmpty => NoContent
      case holidays => Ok(Json.toJson(holidays))
    }
  }
}
