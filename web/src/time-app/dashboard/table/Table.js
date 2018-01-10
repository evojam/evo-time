import React from 'react'

import { SummaryTable } from './SummaryTable'
import { DaysTable } from './DaysTable'

import './Table.css'
import connect from 'react-redux/es/connect/connect'

export const Table = ({ month }) => (
  <div className="dashboard-table">
    <div className="summary-table-container">
      <SummaryTable />
    </div>
    <div className="days-table-container">
      <DaysTable month={month} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  month: state.selectedPeriod[0] // TODO: Temporary, it works only for fullmonths
})

export default connect(mapStateToProps, null)(Table)
