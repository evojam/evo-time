import React from 'react'
import { connect } from 'react-redux'
import { Some, None } from 'monet'
import {
  eachDay, startOfMonth, endOfMonth,
  format, isToday, isFuture, isWeekend,
} from 'date-fns'

import { sumWorklogListToHours } from 'time-lib/date-and-time'

import './DaysTable.css'

const DAY_OF_MONTH = 'DD'
const DAY_NAME = 'dd'

const ClassModifier = {
  Holiday: 'holiday',
  Suspicious: 'suspicious',
}

const TableHeadCell = ({ day }) => {
  const holidayClassName = isWeekend(day) ? ClassModifier.Holiday : ''
  const classNames = [holidayClassName]
    .filter(modifier => modifier !== '')
    .map(modifier => `header__cell--${modifier}`)
    .join(' ')

  return (
    <th key={day} className={`header__cell ${classNames}`}>
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
  const suspiciousClassName = maybeHours
    .orElse(Some(0))
    .filter(() => !isToday(date))
    .filter(() => !isFuture(date))
    .filter(hours => hours < 8)
    .map(() => ClassModifier.Suspicious)
    .orJust('')
  const holidayClassName = isWeekend(date) ? ClassModifier.Holiday : ''
  const classNames = [suspiciousClassName, holidayClassName]
    .filter(modifier => modifier !== '')
    .map(modifier => `body__cell--${modifier}`)
    .join(' ')

  return (
    <td className={classNames}>
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
