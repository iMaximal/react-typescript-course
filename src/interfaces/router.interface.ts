import { RouterState } from 'react-router-redux'

interface Params {
  [key: string]: string
}

export interface IMatch {
  path: string
  url: string
  isExact: boolean
  params: Params
  id?: string
}

export interface IRouter {
  router?: RouterState
}
