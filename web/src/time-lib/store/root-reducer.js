import { combineReducers } from 'redux'

import { routerReducer } from '../router'
import { worklogReducer } from '../worklog'

export const rootReducer = combineReducers({
  router: routerReducer,
  worklog: worklogReducer,
})
