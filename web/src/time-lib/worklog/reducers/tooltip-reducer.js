import { OPEN_TOOLTIP, CLOSE_TOOLTIP } from '../actions'

const initialState = {
  visible: false,
  username: null,
}
export const tooltipReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TOOLTIP:
      return { visible: true, username: action.username }
    case CLOSE_TOOLTIP:
      return initialState
    default:
      return state
  }
}
