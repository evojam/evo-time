import { secondsToHours } from './seconds-to-hours'

export const sumTotalHours = entry =>
  secondsToHours(
    entry.worklog.reduce(
      (acc, worklogList) =>
        acc + worklogList.reduce((acc, log) => acc + log.timeSpentInSeconds, 0),
      0)
  )
