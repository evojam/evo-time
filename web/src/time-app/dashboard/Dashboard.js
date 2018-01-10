import React from 'react'

import Navigation from '../components/navigation/Navigation'
import { Table } from './table'

import './Dashboard.css'

export const Dashboard = () => (
  <div className="dashboard">
    <Navigation className="dashboard__navigation" />
    <Table />
  </div>
)
