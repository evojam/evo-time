import { Map, List } from 'immutable'

const initialState = Map([
  ['mwadon', {
    username: 'mwadon',
    displayName: 'Marcin Wadoń',
    worklog: Map([
      [new Date(new Date(2018, 0, 7)), List([
        {
          timeSpentInSeconds: 7200,
          issueKey: 'ABC-123',
          projectId: 12345,
          date: new Date(2018, 0, 7, 8, 0, 0),
        },
        {
          timeSpentInSeconds: 7200,
          issueKey: 'ABC-123',
          projectId: 12345,
          date: new Date(2018, 0, 7, 15, 0, 0),
        },
      ])],
      [new Date(new Date(2018, 0, 8)), List([
        {
          timeSpentInSeconds: 3600,
          issueKey: 'ABC-123',
          projectId: 12345,
          date: new Date(2018, 0, 8, 10, 0, 0),
        },
        {
          timeSpentInSeconds: 1800,
          issueKey: 'ABC-123',
          projectId: 12345,
          date: new Date(2018, 0, 8, 15, 0, 0),
        },
      ])],
    ])
  }]
])

export const worklogReducer = (state = initialState, action) => state
