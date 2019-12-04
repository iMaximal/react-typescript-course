import { RouterState } from 'connected-react-router'
import { AnyAction } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { initialState as UsersState } from '@store/users/users.reducer'
import { initialState as UserEditState } from '@store/usersEdit/users-edit.reducer'
import { initialState as NotificationState } from '@store/notification/notification.reducer'
import { IRootState } from '@src/interfaces'

type Dispatch = ThunkDispatch<IRootState, void, AnyAction>

const mockStore = configureMockStore<IRootState, Dispatch>([thunk])

export const routerState: RouterState = {
  location: {
    pathname: '/',
    search: '',
    state: undefined,
    hash: '',
  },
  action: 'POP',
}

export const rootStateMock: IRootState = {
  user: {
    loading: false,
    loaded: true,
    failed: false,
    authChecked: true,
    lastUpdate: '2019-12-04T11:01:43.625Z',
    role: 'admin',
    status: 1,
    userId: '221fb55d-b3e7-416b-a099-ede74d0f93fc',
    username: 'test@example2.com',
    email: 'test@example2.com',
    updatedAt: '2019-12-04T11:01:40.104Z',
    createdAt: '2019-12-04T11:01:40.104Z',
    colors: null,
  },
  users: UsersState,
  usersEdit: UserEditState,
  notification: NotificationState,
  form: {},
  router: routerState,
}

export const getMockedStore = (state: Partial<IRootState> = {}, router: RouterState = routerState) =>
  mockStore({
    ...rootStateMock,
    router,
    ...state,
  })
