import React from 'react'

import './Navigation.css'
import { ArrowButton } from './ArrowButton'
import { connect } from 'react-redux'
import { format, isSameMonth } from 'date-fns'
import { getWorklogForNextPeriod, getWorklogForPreviousPeriod } from 'time-lib/worklog/actions'


const mapDispatchToProps = dispatch => ({
  onLeftArrowClick: () => dispatch(getWorklogForPreviousPeriod()),
  onRightArrowClick: () => dispatch(getWorklogForNextPeriod()),
})

const mapStateToProps = state => ({
  selectedPeriod: state.selectedPeriod,
})

const formatPeriod = ([from, to]) => {
  if (isSameMonth(from, to)) {
    return `${format(from, 'MMM D')} - ${format(to, 'D')}, ${format(to, 'YYYY')}`
  } else {
    return `${format(from, 'MMM D')} - ${format(to, 'MMM D')}, ${format(to, 'YYYY')}`
  }
}

export const Navigation = ({ className, onLeftArrowClick, onRightArrowClick, selectedPeriod }) => (
  <nav className={`${className} navigation`}>
    <ArrowButton direction="left" onClick={onLeftArrowClick}/>
    <ArrowButton direction="right" onClick={onRightArrowClick}/>
    <form className="aui navigation__form">
      <input className="text" type="text" readOnly={true} value={formatPeriod(selectedPeriod)}/>
    </form>
  </nav>
)

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)