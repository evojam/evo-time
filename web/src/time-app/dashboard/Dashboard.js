import React from 'react'

import { Table, Navigation } from '../components'

import './Dashboard.css'

export const Dashboard = () => (
  <div className="dashboard">
    <Navigation className="dashboard__navigation"/>
    <Table />
  </div>
)
