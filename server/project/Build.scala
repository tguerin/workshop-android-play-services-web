import sbt._
import Keys._
import com.ketalo.EmberJsKeys
import play.Project._

object ApplicationBuild extends Build with EmberJsKeys {

  val appName         = "Server"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    javaCore,
    javaJdbc,
    javaJpa,
    "org.springframework" % "spring-context" % "3.0.7.RELEASE",
    "org.springframework" % "spring-asm" % "3.0.7.RELEASE",
    "org.springframework" % "spring-expression" % "3.0.7.RELEASE",
    "org.hibernate" % "hibernate-entitymanager" % "3.6.9.Final",
    "mysql" % "mysql-connector-java" % "5.1.13"
  )

  val main = PlayProject(appName, appVersion, appDependencies, mainLang=JAVA).settings(
     emberJsVersion := "1.0.0-rc.5"
  )

}
