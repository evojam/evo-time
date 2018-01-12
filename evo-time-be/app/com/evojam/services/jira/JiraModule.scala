package com.evojam.services.jira

import play.api.{Configuration, Environment}
import play.api.inject.{Binding, Module}
import com.google.inject.Singleton

class JiraModule extends Module {
  override def bindings(environment: Environment, configuration: Configuration): Seq[Binding[JiraService]] = {
    Seq(bind[JiraService].to[JiraServiceImpl].in[Singleton])
  }
}
