import { map, flatMap, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'
import { ofType, combineEpics } from 'redux-observable'
import { format, startOfYear } from 'date-fns'

import { ajax } from '../api'

import {
  getWorklogSuccess, getWorklogFailure, getWorklog,
  getHolidays, getHolidaysSuccess, getHolidaysFailure,
  WorklogActionType,
} from './actions'

const toStringFormat = date => format(date, 'YYYY-MM-DD')
const toYearFormat = date => format(date, 'YYYY')

const previousPeriodEpic = (action$, store) => action$.pipe(
  ofType(WorklogActionType.PreviousPeriod),
  map(() => getWorklog())
)

const nextPeriodEpic = (action$, store) => action$.pipe(
  ofType(WorklogActionType.NextPeriod),
  map(() => getWorklog())
)

const fetchWorklogsEpic = (action$, store) => action$.pipe(
  ofType(WorklogActionType.GetWorklog),
  switchMap(() => {
    const state = store.getState()
    const [from, to] = state.selectedPeriod.map(toStringFormat)

    return ajax.get(`worklogs?from=${from}&to=${to}`).pipe(
      map(getWorklogSuccess),
      catchError(() => of(getWorklogFailure()))
    )
  })
)

const fetchHolidaysOnWorklogsActionEpic = (action$, store) => action$.pipe(
  ofType(WorklogActionType.GetWorklog),
  flatMap(() => {
    const state = store.getState()
    const [year] = state.selectedPeriod.map(startOfYear)
    const holidays = state.holidays

    return holidays.has(year)
      ? []
      : [getHolidays(year)]
  })
)

const fetchHolidaysEpic = (action$, store) => action$.pipe(
  ofType(WorklogActionType.GetHolidays),
  switchMap(() => {
    const state = store.getState()
    const [year] = state.selectedPeriod.map(toYearFormat)

    return ajax.get(`holidays?year=${year}`).pipe(
      map(getHolidaysSuccess(year)),
      catchError(() => of(getHolidaysFailure()))
    )
  })
)

export const worklogEpic = combineEpics(
  previousPeriodEpic,
  nextPeriodEpic,
  fetchWorklogsEpic,
  fetchHolidaysOnWorklogsActionEpic,
  fetchHolidaysEpic,
)
