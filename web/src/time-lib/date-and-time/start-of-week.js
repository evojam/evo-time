import { isMonday, isSunday } from 'date-fns'

export const isStartOfWeek = date => isSunday(date)

export const isStartOfISO8601Week = date => isMonday(date)
