export const WorklogActionType = {
  NextPeriod: 'NEXT_PERIOD',
  PreviousPeriod: 'PREV_PERIOD',
  GetWorklog: 'GET_WORKLOG',
  GetWorklogSuccess: 'GET_WORKLOG_SUCCESS',
  GetWorklogFailure: 'GET_WORKLOG_FAILURE',
  OpenTooltip: 'OPEN_TOOLTIP',
  CloseTooltip: 'CLOSE_TOOLTIP',
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

export function openTooltip({ date, username }) {
  return {
    type: WorklogActionType.OpenTooltip,
    date,
    username,
  }
}

export function closeTooltip() {
  return {
    type: WorklogActionType.CloseTooltip,
  }
}
