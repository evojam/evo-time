import { combineReducers } from 'redux'

import { routerReducer } from '../router'
import { selectedPeriodReducer, tooltipReducer, worklogReducer } from '../worklogs/reducers'

export const rootReducer = combineReducers({
  router: routerReducer,
  selectedPeriod: selectedPeriodReducer,
  worklogs: worklogReducer,
  tooltip: tooltipReducer,
})
