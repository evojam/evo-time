import { sumWorklogInSeconds } from '../date-and-time'
import { Maybe } from 'monet'
import { OrderedMap } from 'immutable'

export const groupByIssue = worklog => worklog.issue.key

const toUserWorklogByDate = date => user => Maybe.fromNull(user.worklogs.get(date))

const toWorklogsPerProject = worklog => worklog
  .groupBy(groupByIssue)
  .map(sumWorklogInSeconds)

export const getSummaryForEachProject = (worklogs, username, date) => {
  return Maybe.fromNull(worklogs.get(username))
    .flatMap(toUserWorklogByDate(date))
    .map(toWorklogsPerProject)
    .orJust(OrderedMap())
}
