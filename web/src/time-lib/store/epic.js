import { combineEpics, createEpicMiddleware } from 'redux-observable'

const rootEpic = combineEpics(

)

export const epicMiddleware = createEpicMiddleware(rootEpic)
