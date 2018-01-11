import React from 'react'
import { connect } from 'react-redux'

import SummaryTable from './summary-table/SummaryTable'
import DaysTable from './days-table/DaysTable'
import UserInfo from './user-info/UserInfo'

import './Table.css'

export const Table = ({ month, tooltip }) => (
    <div className="dashboard-table">
      <div className="summary-table-container">
        <SummaryTable />
      </div>
      <div className="days-table-container">
        <DaysTable month={month} />
      </div>
      {tooltip.visible === true ? <UserInfo /> : null}
    </div>
  )

const mapStateToProps = state => ({
  month: state.selectedPeriod[0], // TODO: Temporary, it works only for fullmonths
  tooltip: state.tooltip
})

export default connect(mapStateToProps)(Table)
