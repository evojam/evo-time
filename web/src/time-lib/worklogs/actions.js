export const WorklogActionType = {
  NextPeriod: 'NEXT_PERIOD',
  PreviousPeriod: 'PREV_PERIOD',
  GetWorklog: 'GET_WORKLOG',
  GetWorklogSuccess: 'GET_WORKLOG_SUCCESS',
  GetWorklogFailure: 'GET_WORKLOG_FAILURE',
  OpenTooltip: 'OPEN_TOOLTIP',
  CloseTooltip: 'CLOSE_TOOLTIP',
  GetHolidays: 'GET_HOLIDAYS',
  GetHolidaysSuccess: 'GET_HOLIDAYS_SUCCESS',
  GetHolidaysFailure: 'GET_HOLIDAYS_FAILURE',
}

export function nextPeriod() {
  return {
    type: WorklogActionType.NextPeriod,
  }
}

export function previousPeriod() {
  return {
    type: WorklogActionType.PreviousPeriod,
  }
}

export function getWorklog() {
  return {
    type: WorklogActionType.GetWorklog,
  }
}

export function getWorklogSuccess(worklogs) {
  return {
    type: WorklogActionType.GetWorklogSuccess,
    payload: worklogs
  }
}

export function getWorklogFailure() {
  return {
    type: WorklogActionType.GetWorklogFailure,
  }
}

export function openTooltip({ date, username, displayName }) {
  return {
    type: WorklogActionType.OpenTooltip,
    date,
    username,
    displayName,
  }
}

export function closeTooltip() {
  return {
    type: WorklogActionType.CloseTooltip,
  }
}

export function getHolidays() {
  return {
    type: WorklogActionType.GetHolidays,
  }
}

export function getHolidaysSuccess(year) {
  return function (holidays) {
    return {
      type: WorklogActionType.GetHolidaysSuccess,
      payload: { year, holidays },
    }
  }
}

export function getHolidaysFailure() {
  return {
    type: WorklogActionType.GetHolidaysFailure,
  }
}
