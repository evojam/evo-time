import { WorklogActionType } from '../actions'

export const loadingReducer = (state = false, action) => {
  if (action.type === WorklogActionType.GetWorklog) {
    return true
  }

  if (action.type === WorklogActionType.GetWorklogSuccess || action.type === WorklogActionType.GetWorklogFailure) {
    return false
  }

  return state
}
