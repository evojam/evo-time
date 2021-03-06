import { sumWorklogInSeconds } from './sum-worklog'

const remainingMinutesInSeconds = seconds => {
  const hours = Math.floor(seconds / 60 / 60)
  return seconds - (hours * 60 * 60)
}

export const sumTotalHours = entry => {
  const seconds = entry.worklogs.reduce((acc, worklogList) => acc + sumWorklogInSeconds(worklogList), 0)
  return secondsToHoursString(seconds)
}

export const secondsToHoursString = seconds => {
  const hours = Math.floor(seconds / 60 / 60)
  const minutes = Math.floor(remainingMinutesInSeconds(seconds) / 60)

  return [[hours, 'h'], [minutes, 'min']]
    .filter(([amount]) => amount > 0)
    .map(([amount, suffix]) => `${amount}${suffix}`)
    .join(' ')
}
