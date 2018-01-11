import React from 'react'
import { connect } from 'react-redux'

import { closeTooltip } from 'time-lib/worklogs'

import './UserInfo.css'

const ENTER_KEYCODE = 27

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
    const { closeTooltip } = this.props
    return (
      <div className="user-info">
        <table className="aui user-info___table">
          <TableHead />
        </table>
        <button className="aui-button user-info__btn" onClick={closeTooltip}>close</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tooltip: state.tooltip
})

const mapDispatchToProps = dispatch => ({
  closeTooltip: () => dispatch(closeTooltip()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
