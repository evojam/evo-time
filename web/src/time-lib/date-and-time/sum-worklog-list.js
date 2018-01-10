import { secondsToHours } from './seconds-to-hours'

export const sumWorklogList = worklogList =>
  secondsToHours(
    worklogList.reduce((acc, log) => acc + log.timeSpentInSeconds, 0),
  )
