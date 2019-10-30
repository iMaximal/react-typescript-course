import { createReducer } from 'redux-act'
import { IUserModel, IUsersState } from '@interfaces/index'

import {
  fetchUsersStartAction,
  fetchUsersSuccessAction,
  fetchUsersErrorAction,
  cleanUsersAction,
} from '@store/users/users.actions'
import { errorCacheState, fetchingCacheState, initialCacheState, successCacheState } from '@src/cache'

export const initialState: IUsersState = {
  list: [],
  ...initialCacheState,
}

const reducers = createReducer<typeof initialState>({}, initialState)

reducers.on(fetchUsersStartAction, (state: IUsersState): IUsersState => ({ ...state, ...fetchingCacheState }))

reducers.on(fetchUsersErrorAction, (state: IUsersState): IUsersState => ({ ...state, ...errorCacheState() }))

reducers.on(
  fetchUsersSuccessAction,
  (state: IUsersState, payload: IUserModel[]): IUsersState => ({ ...state, list: payload, ...successCacheState() }),
)

reducers.on(cleanUsersAction, (): IUsersState => ({ ...initialState }))

export default reducers
