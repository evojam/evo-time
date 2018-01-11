import React from 'react'
import { connect } from 'react-redux'

import Navigation from './navigation/Navigation'
import Table from './table/Table'

import { getWorklog } from 'time-lib/worklogs'

import './Dashboard.css'

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchWorklogs()
  }

  render() {
    return (
      <div className="dashboard">
        <Navigation className="dashboard__navigation" />
        <Table />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchWorklogs: () => dispatch(getWorklog()),
})

export default connect(null, mapDispatchToProps)(Dashboard)
