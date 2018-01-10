package com.evojam.controllers

import java.time.LocalDate
import javax.inject._

import com.evojam.servises.jira.JiraService
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
final class JiraController @Inject()(
  cc: ControllerComponents,
  jira: JiraService
) extends AbstractController(cc) {

  def getWorklogs(from: LocalDate, to: Option[LocalDate]) = Action.async { _ =>
    jira.getWorklogs(from, to.getOrElse(LocalDate.now())).map {
      case xs if xs.isEmpty => NoContent
      case worklogs => Ok(Json.toJson(worklogs))
    }
  }

  def helthcheck() = Action.async { request =>
//    jira.getWorklogs(LocalDate.of(2017, 12, 1), LocalDate.of(2018, 1, 1)).map {
//      case s if s.isEmpty => NoContent
//      case worklogs => Ok(Json.toJson(worklogs))
//    }
//    jira.getProjectById(12300).map {
//      case Some(p) => Ok(Json.toJson(p))
//      case None => NotFound
//    }
    Future.successful(Ok)
  }
}
