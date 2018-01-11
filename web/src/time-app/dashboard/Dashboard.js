import React from 'react'

import Navigation from './navigation/Navigation'
import Table from './table/Table'

import './Dashboard.css'

export const Dashboard = () => (
  <div className="dashboard">
    <Navigation className="dashboard__navigation" />
    <Table />
  </div>
)
