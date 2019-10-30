import { createAction } from 'redux-act'
import { INotificationAction } from '@src/interfaces'

export const showNotificationAction = createAction<INotificationAction>(
  'Notification/Show',
  (payload = {}, config = {}) => ({
    payload,
    config,
  }))
export const cleanNotificationAction = createAction('Notification/Clean')
