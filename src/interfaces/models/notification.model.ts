import {
  IErrorResponse,
} from '@src/interfaces'
import { AxiosError } from 'axios'

export interface INotificationModel {
  type?: 'error' | 'success' | 'info'
  timeout?: number
  message?: string
  errors?: IErrorResponse[]
}

export interface INotificationAction {
  payload?: AxiosError
  config?: Pick<INotificationModel, 'message' | 'timeout' | 'type'>
}
