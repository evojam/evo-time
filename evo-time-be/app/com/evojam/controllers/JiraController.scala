package com.evojam.controllers

import javax.inject._

import com.evojam.configuration.credentials.Credentials
import com.evojam.servises.jira.JiraService
import play.api.libs.json.Json
import play.api.libs.ws.WSClient
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class JiraController @Inject()(
  ws: WSClient,
  cc: ControllerComponents,
  creds: Credentials,
  jira: JiraService
) extends AbstractController(cc) {

  /**
    * Create an Action to render an HTML page.
    *
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok
  }

  def helthcheck() = Action.async { request =>
    jira.getProjectById(12300).map {
      case Some(p) => Ok(Json.toJson(p))
      case None => NotFound
    }
  }
}
