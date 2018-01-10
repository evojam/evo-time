package com.evojam.configuration.credentials

import play.api.{Configuration, Environment}
import play.api.inject.{Binding, Module}
import com.google.inject.Singleton

class CredentialModule extends Module {
  override def bindings(environment: Environment, configuration: Configuration): Seq[Binding[Credentials]] = {
    val url = configuration.get[String]("evojam.url")
    val user = configuration.get[String]("evojam.user")
    val token = configuration.get[String]("evojam.token")
    val creds = Credentials(url, user, token)
    Seq(bind[Credentials].toInstance(creds).in[Singleton])
  }
}
