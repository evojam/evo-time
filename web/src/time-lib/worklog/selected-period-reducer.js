import { addMonths, subMonths, endOfMonth, startOfMonth } from 'date-fns'
import { GET_WORKLOG_FOR_NEXT_PERIOD_ACTION, GET_WORKLOG_FOR_PREVIOUS_PERIOD_ACTION } from './actions'

const initialState = [startOfMonth(new Date()), endOfMonth(new Date())]

export const selectedPeriodReducer = (state = initialState, action) => {
  const [from, to] = state

  switch (action.type) {
    case GET_WORKLOG_FOR_NEXT_PERIOD_ACTION:
      return [addMonths(from, 1), endOfMonth(addMonths(to, 1))]
    case GET_WORKLOG_FOR_PREVIOUS_PERIOD_ACTION:
      return [subMonths(from, 1), endOfMonth(subMonths(to, 1))]
    default:
      return state
  }
}
