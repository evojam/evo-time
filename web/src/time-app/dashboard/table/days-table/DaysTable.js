import React from 'react'
import { connect } from 'react-redux'
import { Some, None } from 'monet'
import {
  eachDay, startOfMonth, endOfMonth,
  format, isWeekend,
} from 'date-fns'

import { sumWorklogListToHours, isStartOfWeek, isSuspiciousWorklog } from 'time-lib/date-and-time'

import './DaysTable.css'

const DAY_OF_MONTH = 'DD'
const DAY_NAME = 'dd'

const ClassModifier = {
  Holiday: 'holiday',
  Suspicious: 'suspicious',
  StartOfWeek: 'start-of-week',
}

const shouldApplyModifier = (modifier, date, hours) => {
  switch (modifier) {
    case ClassModifier.Holiday:
      return isWeekend(date)
    case ClassModifier.StartOfWeek:
      return isStartOfWeek(date)
    case ClassModifier.Suspicious:
      return isSuspiciousWorklog(date, hours)
    default:
      return false
  }
}

const classNameWithModifiers = (...modifiers) => (baseClass, date, hours = null) => modifiers
  .reduce((className, modifier) => {
    return shouldApplyModifier(modifier, date, hours) ? `${className} ${baseClass}--${modifier}` : className
  }, baseClass)

const TableHeadCell = ({ day }) => {
  const className = classNameWithModifiers(
    ClassModifier.Holiday,
    ClassModifier.StartOfWeek
  )('header__cell', day)

  return (
    <th key={day} className={className}>
      <span className="bold">{format(day, DAY_OF_MONTH)}</span>
      <span>{format(day, DAY_NAME)}</span>
    </th>
  )
}

const TableHead = ({ daysInMonth }) => (
  <thead>
    <tr>
      {daysInMonth.map(date => <TableHeadCell key={date} day={date} />)}
    </tr>
  </thead>
)

const TableBodyCell = ({ date, hours: maybeHours }) => {
  const hours = maybeHours.orJust(0)

  const className = classNameWithModifiers(
    ClassModifier.Holiday,
    ClassModifier.StartOfWeek,
    ClassModifier.Suspicious
  )('body__cell', date, hours)

  return (
    <td className={className}>
      {maybeHours.orJust('')}
    </td>
  )
}

const TableBodyRow = ({ daysInMonth, worklog }) => (
  <tr>
    {daysInMonth.map(date =>
      <TableBodyCell
        key={date}
        date={date}
        hours={worklog.has(date) ? Some(sumWorklogListToHours(worklog.get(date))) : None()}
      />)}
  </tr>
)

const TableBody = ({ daysInMonth, worklog }) => (
  <tbody>
    {worklog
      .map((entry, key) =>
        <TableBodyRow
          key={key}
          daysInMonth={daysInMonth}
          worklog={entry.worklog} />)
      .toList()}
  </tbody>
)

export const DaysTable = ({ month, worklog }) => {
  const daysInMonth = eachDay(startOfMonth(month), endOfMonth(month))

  return (
    <table className="aui days-table">
      <TableHead daysInMonth={daysInMonth} />
      <TableBody daysInMonth={daysInMonth} worklog={worklog} />
    </table>
  )
}

const mapStateToProps = state => ({
  worklog: state.worklog,
})

export default  connect(mapStateToProps)(DaysTable)
