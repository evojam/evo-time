import { combineReducers } from 'redux'

import { routerReducer } from '../router'
import { selectedPeriodReducer, tooltipReducer, worklogReducer } from '../worklog/reducers'

export const rootReducer = combineReducers({
  router: routerReducer,
  selectedPeriod: selectedPeriodReducer,
  worklog: worklogReducer,
  tooltip: tooltipReducer,
})
