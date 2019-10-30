import { createReducer } from 'redux-act'
import {
  INotificationAction,
  INotificationState,
} from '@interfaces/index'

import { showNotificationAction, cleanNotificationAction } from '@store/notification/notification.actions'

export const initialState: INotificationState = {
  active: null,
}

const reducers = createReducer<typeof initialState>({}, initialState)

reducers.on(
  showNotificationAction,
  (state: INotificationState, data: INotificationAction): INotificationState => {
    const { config, payload } = data
    const { message, response } = payload

    return {
      ...(response && response.data ? { ...response.data } : {}),
      ...(message ? { message } : {}),
      ...(config ? { ...config } : {}),
      active: true,
      createdTime: Date.now(),
    }
  },
)

reducers.on(cleanNotificationAction, (): INotificationState => ({ ...initialState }))

export default reducers
