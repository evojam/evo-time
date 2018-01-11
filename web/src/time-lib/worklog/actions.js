export const GET_WORKLOG_FOR_PREVIOUS_PERIOD_ACTION = 'GET_WORKLOG_FOR_PREVIOUS_PERIOD_ACTION'
export const GET_WORKLOG_FOR_NEXT_PERIOD_ACTION = 'GET_WORKLOG_FOR_NEXT_PERIOD_ACTION'
export const OPEN_TOOLTIP = 'OPEN_TOOLTIP'
export const CLOSE_TOOLTIP = 'CLOSE_TOOLTIP'

export function getWorklogForPreviousPeriod() {
  return {
    type: GET_WORKLOG_FOR_PREVIOUS_PERIOD_ACTION,
  }
}

export function getWorklogForNextPeriod() {
  return {
    type: GET_WORKLOG_FOR_NEXT_PERIOD_ACTION,
  }
}

export function openTooltip(username) {
  return {
    type: OPEN_TOOLTIP,
    username,
  }
}

export function closeTooltip() {
  return {
    type: CLOSE_TOOLTIP
  }
}
