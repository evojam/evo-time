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

const TableBody = ({ worklogs }) => (
  <tbody>
    {worklogs.map((entry, key) =>
      <tr key={key}>
        <td className="body__cell">
          {entry.avatar && <img src={entry.avatar} className="body-cell__avatar" />}
          {entry.displayName}
        </td>
        <td className="body__cell body__cell--right">{sumTotalHours(entry)}</td>
      </tr>
    ).toList()}
  </tbody>
)

export const SummaryTable = ({ worklogs }) => (
    <table className="aui summary-table">
      <TableHead />
      <TableBody worklogs={worklogs} />
    </table>
  )

const mapStateToProps = state => ({
  worklogs: state.worklogs,
})

export default connect(mapStateToProps)(SummaryTable)
