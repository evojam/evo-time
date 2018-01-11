import React from 'react'
import { connect } from 'react-redux'

import { closeTooltip } from 'time-lib/worklog'

import './UserInfo.css'

const TableHead = () => (
  <thead>
    <tr>
      <th>Date</th>
      <th>User</th>
      <th>Project</th>
      <th>Worked</th>
    </tr>
  </thead>
)

const UserInfo = ({ tooltip, closeTooltip }) => (
   <div className="user-info">
     <table className="aui user-info___table">
       <TableHead ></TableHead>
     </table>
     <button className="aui-button user-info__btn" onClick={closeTooltip}>close</button>
   </div>
)

const mapStateToProps = state => ({
  tooltip: state.tooltip
})

const mapDispatchToProps = dispatch => ({
  closeTooltip: () => dispatch(closeTooltip()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
