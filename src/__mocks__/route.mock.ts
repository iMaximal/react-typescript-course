import * as H from 'history'
import { RouteComponentProps } from 'react-router'

export const locationMock: H.Location = {
  hash: '',
  search: '',
  state: undefined,
  pathname: 'pathname',
}

export const historyMock: H.History = {
  action: 'PUSH',
  block: jest.fn(),
  createHref: jest.fn(),
  go: jest.fn(),
  goBack: jest.fn(),
  goForward: jest.fn(),
  length: 3,
  listen: jest.fn(),
  location: locationMock,
  push: jest.fn(),
  replace: jest.fn(),
}

export const routeMock = <P>(params: P): RouteComponentProps<P> => ({
  history: historyMock,
  location: locationMock,
  match: {
    params,
    isExact: false,
    path: 'path',
    url: 'url',
  },
})
