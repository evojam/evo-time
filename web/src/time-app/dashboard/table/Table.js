import React from 'react'

import { SummaryTable } from './SummaryTable'
import { DaysTable } from './DaysTable'

import './Table.css'

export const Table = () => {
  const usersSummary = [
    {
      userName: 'Anna D',
      sumOfHours: 124,
    },
    {
      userName: 'Paweł D',
      sumOfHours: 74,
    },
  ]

  return (
    <div className="dashboard-table">
      <SummaryTable className="summary-table" usersSummary={usersSummary}/>
      <div className="days-table-container">
        <DaysTable />
      </div>
    </div>
    )
}

