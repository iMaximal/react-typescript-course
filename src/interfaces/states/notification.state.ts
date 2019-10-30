import { INotificationModel } from '@src/interfaces'

export interface INotificationState extends INotificationModel {
  active: true | null
  createdTime?: number
  timeout?: number
  message?: string
}
