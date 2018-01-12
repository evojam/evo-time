import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import { rootReducer } from './root-reducer'
import { epicMiddleware } from './epic'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createHistory()

const middlewares = [
  routerMiddleware(history),
  epicMiddleware,
]

const enhacer = composeEnhancers(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, enhacer)
