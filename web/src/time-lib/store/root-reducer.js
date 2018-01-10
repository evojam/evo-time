import { combineReducers } from 'redux'

import { routerReducer } from '../router'
import { selectedPeriodReducer } from '../worklog/selected-period-reducer'
import { worklogReducer } from '../worklog'

export const rootReducer = combineReducers({
  router: routerReducer,
  selectedPeriod: selectedPeriodReducer,
  worklog: worklogReducer,
})
