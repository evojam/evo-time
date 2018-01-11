package com.evojam.utils

import org.apache.commons.lang3.StringUtils

object StringNormalization {

  implicit class normalizer(str: String) {
    def normalize: String = StringUtils.stripAccents(str.split(" ").filterNot(_.trim.isEmpty).mkString(" "))
  }

}
