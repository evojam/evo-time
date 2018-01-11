import { combineReducers } from 'redux'

import { routerReducer } from '../router'
import { loadingReducer, selectedPeriodReducer, tooltipReducer, worklogReducer } from '../worklogs/reducers'

export const rootReducer = combineReducers({
  router: routerReducer,
  selectedPeriod: selectedPeriodReducer,
  worklogs: worklogReducer,
  isLoading: loadingReducer,
  tooltip: tooltipReducer,
})
