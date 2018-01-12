import React from 'react'
import { Provider } from 'react-redux'

import { store } from 'time-lib/store'

import { MainComponent } from './MainComponent'

export const App = () => (
  <Provider store={store}>
    <MainComponent />
  </Provider>
)