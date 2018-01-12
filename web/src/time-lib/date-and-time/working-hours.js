import {
  isFuture,
  isToday,
  isWeekend,
  startOfYear,
  startOfDay,
} from 'date-fns'

// TODO: It will be dynamic depending on person, that's why I moved the logic here
const WORKING_HOURS = 8

export const isOvertime = hours => hours > WORKING_HOURS

export const isNotComplete = hours => hours < WORKING_HOURS

export const isEmpty = hours => !hours

export const isSuspiciousWorklog = (holidays, date, hours) =>
  !isHoliday(holidays, date)
  && !isToday(date)
  && !isFuture(date)
  && !isWeekend(date)
  && (isOvertime(hours) || isNotComplete(hours) || isEmpty(hours))

export const isHoliday = (holidays, date) => {
  const year = startOfYear(date)
  return holidays.has(year) && holidays.get(year).has(startOfDay(date))
}
