import { Map, List } from 'immutable'
import { Maybe } from 'monet'
import { startOfDay, parse } from 'date-fns'

import { WorklogActionType } from '../actions'

const mapUserDetail = userDetail => ({
    ...userDetail,
    worklogs: List(userDetail.worklogs)
      .map(worklog => ({ ...worklog, date: parse(worklog.date) }))
      .groupBy(worklog => startOfDay(parse(worklog.date))),
  })

const toUserAggregationWorklogs = worklogs => Map(worklogs).map(mapUserDetail)

export const worklogReducer = (state = Map(), action) => {
  switch (action.type) {
    case WorklogActionType.GetWorklog:
      return Map()

    case WorklogActionType.GetWorklogSuccess:
      return Maybe.fromNull(action.payload)
        .map(toUserAggregationWorklogs)
        .orJust(Map())

    default:
      return state
  }
}
