import { WorklogActionType } from '../actions'

const initialState = {
  visible: false,
  displayName: null,
  username: null,
  date: null,
}
export const tooltipReducer = (state = initialState, action) => {
  switch (action.type) {
    case WorklogActionType.OpenTooltip:
      return { visible: true, username: action.username, displayName: action.displayName, date: action.date }
    case WorklogActionType.PreviousPeriod:
    case WorklogActionType.NextPeriod:
    case WorklogActionType.CloseTooltip:
      return initialState
    default:
      return state
  }
}
