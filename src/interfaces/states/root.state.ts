import { FormStateMap } from 'redux-form'
import { RouterState } from 'connected-react-router'

import { INotificationState, IUsersEditState, IUsersState, IUserState } from '@src/interfaces'

export interface IRootState {
  user: IUserState
  notification: INotificationState
  users: IUsersState
  usersEdit: IUsersEditState
  form: FormStateMap
  router: RouterState
}
