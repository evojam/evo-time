import { combineReducers } from 'redux'

import { routerReducer } from '../router'
import { selectedPeriodReducer, worklogReducer } from '../worklog/reducers'

export const rootReducer = combineReducers({
  router: routerReducer,
  selectedPeriod: selectedPeriodReducer,
  worklog: worklogReducer,
})
