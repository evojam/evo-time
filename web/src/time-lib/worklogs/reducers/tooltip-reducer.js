import { WorklogActionType } from '../actions'

const initialState = {
  visible: false,
  username: null,
}
export const tooltipReducer = (state = initialState, action) => {
  switch (action.type) {
    case WorklogActionType.OpenTooltip:
      return { visible: true, username: action.username }
    case WorklogActionType.CloseTooltip:
      return initialState
    default:
      return state
  }
}
