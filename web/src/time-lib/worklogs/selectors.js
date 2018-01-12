import { Maybe } from 'monet'
import { OrderedMap } from 'immutable'

export const groupByIssue = worklog => worklog.project.id

const toUserWorklogByDate = date => user => Maybe.fromNull(user.worklogs.get(date))

const toWorklogsPerProject = worklog => worklog
  .groupBy(groupByIssue)
  .map(worklogs => worklogs
    .reduce(({ projectName, totalSeconds }, worklog) => {
      return {
        projectName: worklog.project.name,
        totalSeconds: totalSeconds + worklog.timeSpentInSeconds
      }
    }, { projectName: null, totalSeconds: 0 })
  )

export const getSummaryForEachProject = (worklogs, username, date) => {
  return Maybe.fromNull(worklogs.get(username))
    .flatMap(toUserWorklogByDate(date))
    .map(toWorklogsPerProject)
    .orJust(OrderedMap())
}
