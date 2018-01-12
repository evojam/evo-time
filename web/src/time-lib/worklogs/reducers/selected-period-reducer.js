import { addMonths, subMonths, endOfMonth, startOfMonth } from 'date-fns'
import { WorklogActionType } from '../actions'

const initialState = [startOfMonth(new Date()), endOfMonth(new Date())]

export const selectedPeriodReducer = (state = initialState, action) => {
  const [from, to] = state

  switch (action.type) {
    case WorklogActionType.NextPeriod:
      return [addMonths(from, 1), endOfMonth(addMonths(to, 1))]
    case WorklogActionType.PreviousPeriod:
      return [subMonths(from, 1), endOfMonth(subMonths(to, 1))]
    default:
      return state
  }
}
