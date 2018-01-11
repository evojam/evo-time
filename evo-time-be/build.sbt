name := """evo-time-be"""
organization := "com.evojam"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.3"

libraryDependencies += guice
libraryDependencies += ws
libraryDependencies += ehcache
libraryDependencies += "org.apache.commons" % "commons-lang3" % "3.7"
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test


// Adds additional packages into conf/routes
play.sbt.routes.RoutesKeys.routesImport += "com.evojam.utils.QueryBinders._"
play.sbt.routes.RoutesKeys.routesImport += "java.time.LocalDate"
