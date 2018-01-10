import React from 'react'

import { SummaryTable } from './SummaryTable'
import { DaysTable } from './DaysTable'

import './Table.css'

export const Table = () => (
  <div className="dashboard-table">
    <SummaryTable className="summary-table" />
    <DaysTable className="days-table" />
  </div>
)
