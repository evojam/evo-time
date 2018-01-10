export const GET_WORKLOG_FOR_PREVIOUS_PERIOD_ACTION = 'GET_WORKLOG_FOR_PREVIOUS_PERIOD_ACTION'
export const GET_WORKLOG_FOR_NEXT_PERIOD_ACTION = 'GET_WORKLOG_FOR_NEXT_PERIOD_ACTION'

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
