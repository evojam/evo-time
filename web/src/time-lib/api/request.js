import { ajax as ajaxRequest } from 'rxjs/observable/dom/ajax'
import { map } from 'rxjs/operators'
import { Map } from 'immutable'

const prefixed = url => `${process.env.REACT_APP_API_URL}${url}`

const RequestType = Object.freeze({
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
})

const RequestMethod = Map([
  [RequestType.GET, ajaxRequest.get],
  [RequestType.POST, ajaxRequest.post],
  [RequestType.PUT, ajaxRequest.put],
  [RequestType.PATCH, ajaxRequest.patch],
  [RequestType.DELETE, ajaxRequest.delete],
])

const request = requestType => (url, data) => {
  const prefixedUrl = prefixed(url)
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  }

  const method = RequestMethod.get(requestType)
  const toResponse = map(({ response }) => response)

  switch (requestType) {
    case RequestType.GET:
    case RequestType.DELETE:
      return method(prefixedUrl, headers).pipe(toResponse)
    default:
      return method(prefixedUrl, data, headers).pipe(toResponse)
  }
}

export const ajax = {
  get: request(RequestType.GET),
  post: request(RequestType.POST),
  put: request(RequestType.PUT),
  patch: request(RequestType.PATCH),
  delete: request(RequestType.DELETE),
}
