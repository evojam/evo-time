import { WorklogActionType } from '../actions'

const initialState = {
  visible: false,
  username: null,
  date: null,
}
export const tooltipReducer = (state = initialState, action) => {
  switch (action.type) {
    case WorklogActionType.OpenTooltip:
      return { visible: true, username: action.username, date: action.date }
    case WorklogActionType.CloseTooltip:
      return initialState
    default:
      return state
  }
}
