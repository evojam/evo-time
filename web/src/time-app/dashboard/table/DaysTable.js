import React from 'react'
import { connect } from 'react-redux'
import { eachDay, startOfMonth, endOfMonth, format } from 'date-fns'

import { sumWorklogList } from 'time-lib/date-and-time'

import './DaysTable.css'

const DAY_OF_MONTH = 'DD'
const DAY_NAME = 'dd'

const TableHeadCell = ({ day }) => (
  <th key={day} className="head-cell">
    <span className="bold">{format(day, DAY_OF_MONTH)}</span>
    <span>{format(day, DAY_NAME)}</span>
  </th>
)

const TableHead = ({ daysInMonth }) => (
  <thead>
    <tr>
      {daysInMonth.map(date => <TableHeadCell key={date} day={date} />)}
    </tr>
  </thead>
)

const TableBodyRow = ({ daysInMonth, worklog }) => (
  <tr>
    {daysInMonth.map(date =>
      <td key={date}>{worklog.has(date) ? sumWorklogList(worklog.get(date)) : ''}</td>
    )}
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

const DaysTableComponent = ({ month, worklog }) => {
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

export const DaysTable = connect(mapStateToProps)(DaysTableComponent)
