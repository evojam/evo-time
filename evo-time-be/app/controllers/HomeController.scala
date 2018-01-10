package controllers

import javax.inject._
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.libs.ws.{WSAuthScheme, WSClient, WSResponse}
import play.api.mvc._

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject()(ws: WSClient, cc: ControllerComponents) extends AbstractController(cc) {

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
    ws.url("https://evojam.atlassian.net/rest/api/2/project/12500")
      .withAuth("pawel+hackatonevojam@evojam.com", "K0EndDzqCqPuZk7n9qTj57E1", WSAuthScheme.BASIC)
      .addHttpHeaders("Accept" -> "application/json")
      .get()
      .map { r => Ok(r.json) }
  }
}
