import { createReducer } from 'redux-act'
import { IUserModel, IUsersEditState } from '@interfaces/index'

import {
  fetchUserByIdStartAction,
  fetchUserByIdSuccessAction,
  fetchUserByIdErrorAction,
  saveUserStartAction,
  saveUserSuccessAction,
  saveUserErrorAction,
} from '@store/usersEdit/users-edit.actions'
import { errorCacheState, fetchingCacheState, initialCacheState, successCacheState } from '@src/cache'

export const initialState: IUsersEditState = {
  data: null,
  ...initialCacheState,
}

const reducers = createReducer<typeof initialState>({}, initialState)

reducers.on(
  fetchUserByIdStartAction,
  (state: IUsersEditState): IUsersEditState => ({
    ...state,
    ...fetchingCacheState,
  }),
)

reducers.on(
  fetchUserByIdErrorAction,
  (state: IUsersEditState): IUsersEditState => ({
    ...state,
    ...errorCacheState(),
  }),
)

reducers.on(
  fetchUserByIdSuccessAction,
  (state: IUsersEditState, payload: IUserModel): IUsersEditState => ({
    ...state,
    data: payload,
    ...successCacheState(),
  }),
)

reducers.on(
  saveUserStartAction,
  (state: IUsersEditState): IUsersEditState => ({
    ...state,
    ...fetchingCacheState,
  }),
)

reducers.on(
  saveUserErrorAction,
  (state: IUsersEditState): IUsersEditState => ({
    ...state,
    ...errorCacheState(),
  }),
)

reducers.on(
  saveUserSuccessAction,
  (state: IUsersEditState): IUsersEditState => ({
    ...initialState,
  }),
)

export default reducers
