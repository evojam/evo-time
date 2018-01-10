import React from 'react'

import './Navigation.css'
import { ArrowButton } from './ArrowButton'

export const Navigation = ({ onLeftArrowClick, onRightArrowClick, className }) => (
  <nav className={className + " navigation"}>
    <ArrowButton direction="left" onClick={onLeftArrowClick}/>
    <ArrowButton direction="right" onClick={onRightArrowClick}/>
  </nav>
)
