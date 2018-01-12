import { Map } from 'immutable'
import { parse, startOfYear, isSameYear, startOfDay } from 'date-fns'

import { WorklogActionType } from '../actions'

const initialState = Map([])

export const holidaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case WorklogActionType.GetHolidaysSuccess:
      const { holidays, year } = action.payload

      return state.set(startOfYear(year), Map(
        Object.keys(holidays)
          .map(date => [date, holidays[date]])
          .map(([date, value]) => [parse(date.slice(0, -1)), value]) // TODO: temporary removing ending 'Z'
          .map(([date, value]) => [startOfDay(date), value])
      ))
    default:
      return state
  }
}
