import React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import { history } from 'time-lib/store'

import { Dashboard } from './dashboard'

export const MainComponent = () => (
  <ConnectedRouter history={history}>
    <Route exact path="/" component={Dashboard} />
  </ConnectedRouter>
)
