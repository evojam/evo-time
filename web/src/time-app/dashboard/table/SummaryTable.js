import React from 'react'
import './SummaryTable.css'

export const SummaryTable = ({usersSummary, className}) => (
    <table className={`aui ${className}`}>
      <thead>
        <tr>
          <th>User</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
      {usersSummary.map(user =>
        <tr key={user.userName}>
          <td className="summary-table__cell">{user.userName}</td>
          <td className="summary-table__cell">{user.sumOfHours}</td>
        </tr>
      )}
      </tbody>
    </table>
  )
