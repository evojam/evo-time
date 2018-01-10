import { combineReducers } from 'redux'

import { routerReducer } from '../router'

export const rootReducer = combineReducers({
  router: routerReducer,
})