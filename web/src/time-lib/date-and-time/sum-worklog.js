import { secondsToHours } from './seconds-to-hours'

export const sumWorklogInSeconds = worklogList =>
  worklogList.reduce((acc, log) => acc + log.timeSpentInSeconds, 0)

export const sumWorklogListToHours = worklogList =>
  secondsToHours(sumWorklogInSeconds(worklogList))
