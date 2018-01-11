import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'
import { ofType, combineEpics } from 'redux-observable'
import { format } from 'date-fns'

import { ajax } from '../api'

import {
  getWorklogSuccess, getWorklogFailure, getWorklog,
  WorklogActionType,
} from './actions'

const toStringFormat = date => format(date, 'YYYY-MM-DD')

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

export const worklogEpic = combineEpics(
  previousPeriodEpic,
  nextPeriodEpic,
  fetchWorklogsEpic,
)
