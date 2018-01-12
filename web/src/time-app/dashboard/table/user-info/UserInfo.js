import React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import { closeTooltip, getSummaryForEachProject } from 'time-lib/worklogs'

import './UserInfo.css'
import { secondsToHoursString } from '../../../../time-lib/date-and-time'

const ENTER_KEYCODE = 27

const formatDate = date => format(date, 'DD/MMM/YYYY')

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

const TableBody = ({ date, displayName, worklogs }) => (
  <tbody>
  {
    worklogs && worklogs
      .map(({ projectName, totalSeconds }, projectId) => (
        <tr key={projectId}>
          <td>{formatDate(date)}</td>
          <td>{displayName}</td>
          <td>{projectName}</td>
          <td>{secondsToHoursString(totalSeconds)}</td>
        </tr>
      ))
      .toList()

  }
  </tbody>
)

class UserInfo extends React.Component {

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (event) => {
    const { closeTooltip } = this.props

    if (event.keyCode === ENTER_KEYCODE) {
      closeTooltip()
    }
  }

  render() {
    const { closeTooltip, tooltip, worklogs } = this.props

    return (
      <div className="user-info">
        <table className="aui user-info___table">
          <TableHead />
          <TableBody date={tooltip.date} displayName={tooltip.displayName} worklogs={worklogs}/>
        </table>
        <button className="aui-button user-info__btn" onClick={closeTooltip}>close</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tooltip: state.tooltip,
  worklogs: getSummaryForEachProject(state.worklogs, state.tooltip.username, state.tooltip.date)
})

const mapDispatchToProps = dispatch => ({
  closeTooltip: () => dispatch(closeTooltip()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
