import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { worklogEpic } from '../worklogs'

const rootEpic = combineEpics(
  worklogEpic,
)

export const epicMiddleware = createEpicMiddleware(rootEpic)
