import React from 'react'
import { connect } from 'react-redux'
import { Some, None } from 'monet'
import {
  eachDay, startOfMonth, endOfMonth,
  format, isWeekend,
} from 'date-fns'

import { sumWorklogListToHours, isStartOfWeek, isSuspiciousWorklog, isHoliday } from 'time-lib/date-and-time'
import { openTooltip, closeTooltip } from 'time-lib/worklogs'

import './DaysTable.css'

const DAY_OF_MONTH = 'DD'
const DAY_NAME = 'dd'

const ClassModifier = {
  Holiday: 'holiday',
  Suspicious: 'suspicious',
  StartOfWeek: 'start-of-week',
}

const shouldApplyModifier = (modifier, date, hours, holidays) => {
  switch (modifier) {
    case ClassModifier.Holiday:
      return isWeekend(date) || isHoliday(holidays, date)
    case ClassModifier.StartOfWeek:
      return isStartOfWeek(date)
    case ClassModifier.Suspicious:
      return isSuspiciousWorklog(holidays, date, hours)
    default:
      return false
  }
}

const classNameWithModifiers = holidays => (...modifiers) => (baseClass, date, hours = null) => modifiers
  .reduce((className, modifier) => {
    return shouldApplyModifier(modifier, date, hours, holidays) ? `${className} ${baseClass}--${modifier}` : className
  }, baseClass)

const TableHeadCellComponent = ({ day, holidays }) => {
  const className = classNameWithModifiers(holidays)(
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

const TableHeadCell = connect((state => ({ holidays: state.holidays })))(TableHeadCellComponent)

const TableHead = ({ daysInMonth }) => (
  <thead>
    <tr>
      {daysInMonth.map(date => <TableHeadCell key={date} day={date} />)}
    </tr>
  </thead>
)

const TableBodyCellComponent = ({ date, hours: maybeHours, username, displayName, openTooltip, closeTooltip, holidays }) => {
  const hours = maybeHours.orJust(0)

  const className = classNameWithModifiers(holidays)(
    ClassModifier.Holiday,
    ClassModifier.StartOfWeek,
    ClassModifier.Suspicious
  )('body__cell', date, hours)

  return maybeHours
      .map(hours => (
        <td className={className} onClick={openTooltip({ date, username, displayName })}>
          { hours || '' }
        </td>
      ))
      .orJust(
        <td className={className} onClick={closeTooltip()}>{ hours || '' }</td>
      )
}

const mapDispatchToProps = dispatch => ({
  openTooltip: payload => () => dispatch(openTooltip(payload)),
  closeTooltip: () => () => dispatch(closeTooltip())
})
const TableBodyCell = connect(state => ({ holidays: state.holidays }), mapDispatchToProps)(TableBodyCellComponent)


const TableBodyRow = ({ daysInMonth, worklogs, username, displayName }) => (
  <tr>
    {daysInMonth.map(date =>
      <TableBodyCell
        key={date}
        date={date}
        hours={worklogs.has(date) ? Some(sumWorklogListToHours(worklogs.get(date))) : None()}
        username={username}
        displayName={displayName}
      />)}
  </tr>
)

const TableBody = ({ daysInMonth, worklogs }) => (
  <tbody>
    {worklogs
      .map((entry, key) =>
        <TableBodyRow
          key={key}
          daysInMonth={daysInMonth}
          username={entry.username}
          displayName={entry.displayName}
          worklogs={entry.worklogs} />)
      .toList()}
  </tbody>
)

export const DaysTable = ({ month, worklogs }) => {
  const daysInMonth = eachDay(startOfMonth(month), endOfMonth(month))

  return (
    <table className="aui days-table">
      <TableHead daysInMonth={daysInMonth} />
      <TableBody daysInMonth={daysInMonth} worklogs={worklogs} />
    </table>
  )
}

const mapStateToProps = state => ({
  worklogs: state.worklogs,
})

export default  connect(mapStateToProps)(DaysTable)
