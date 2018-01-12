package com.evojam.services.calendar

import play.api.{Configuration, Environment}
import play.api.inject.{Binding, Module}
import com.google.inject.Singleton

final class CalendarModule extends Module {

  override def bindings(environment: Environment, configuration: Configuration): Seq[Binding[CalendarService]] = {
    Seq(bind[CalendarService].to[CalendarServiceImpl].in[Singleton])
  }
}
