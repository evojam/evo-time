package com.evojam.utils

import java.time.LocalDate

import play.api.mvc.QueryStringBindable

import scala.util.Try

object QueryBinders {
  implicit val queryLocalDateBindable = new QueryStringBindable[LocalDate] {
    override def bind(key: String, params: Map[String, Seq[String]]): Option[Either[String, LocalDate]] =
      params.get(key).flatMap(_.headOption)
        .map(date => Try(LocalDate.parse(date))).map(_.toEither.left.map(_.getMessage))

    override def unbind(key: String, value: LocalDate): String = key + "=" + value.toString
  }
}
