import React from 'react'
import { connect } from 'react-redux'

import { sumTotalHours } from 'time-lib/date-and-time'

import './SummaryTable.css'

const TableHead = () => (
  <thead>
    <tr>
      <th className="header__cell">User</th>
      <th className="header__cell header__cell--right">Σ</th>
    </tr>
  </thead>
)

const TableBody = ({ worklog }) => (
  <tbody>
    {worklog.map((entry, key) =>
      <tr key={key}>
        <td className="body__cell">{entry.displayName}</td>
        <td className="body__cell body__cell--right">{sumTotalHours(entry)}</td>
      </tr>
    ).toList()}
  </tbody>
)

const SummaryTableComponent = ({ worklog }) => (
    <table className="aui summary-table">
      <TableHead />
      <TableBody worklog={worklog} />
    </table>
  )

const mapStateToProps = state => ({
  worklog: state.worklog,
})

export const SummaryTable = connect(mapStateToProps)(SummaryTableComponent)
