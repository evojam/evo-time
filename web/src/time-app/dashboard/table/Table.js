import React from 'react'

import { SummaryTable } from './SummaryTable'
import { DaysTable } from './DaysTable'

import './Table.css'

export const Table = () => (
  <div className="dashboard-table">
    <div className="summary-table-container">
      <SummaryTable />
    </div>
    <div className="days-table-container">
      <DaysTable month={new Date(2018, 0)} />
    </div>
  </div>
)
