import { createReducer } from 'redux-act'
import { IUserModel, IUserState } from '@interfaces/index'

import {
  checkUserAuthenticationErrorAction,
  checkUserAuthenticationStartAction,
  checkUserAuthenticationSuccessAction,
  fetchUserErrorAction,
  fetchUserStartAction,
  fetchUserSuccessAction,
  logoutUserSuccessAction,
  logoutUserErrorAction,
  signupUserErrorAction,
  signupUserStartAction,
  signupUserSuccessAction,
  logoutUserStartAction,
} from '@store/user/user.actions'
import { errorCacheState, fetchingCacheState, successCacheState } from '@src/cache'

export const initialState: IUserState = null

const reducers = createReducer<typeof initialState>({}, initialState)

reducers.on(fetchUserStartAction, (state: IUserState): IUserState => ({ ...state, ...fetchingCacheState }))

reducers.on(fetchUserErrorAction, (state: IUserState): IUserState => ({ ...state, ...errorCacheState() }))

reducers.on(
  fetchUserSuccessAction,
  (state: IUserState, payload: IUserModel): IUserState => ({ ...state, ...payload, ...successCacheState() }),
)

reducers.on(signupUserStartAction, (state: IUserState): IUserState => ({ ...state, ...fetchingCacheState }))

reducers.on(signupUserErrorAction, (state: IUserState): IUserState => ({ ...state, ...errorCacheState() }))

reducers.on(
  signupUserSuccessAction,
  (state: IUserState, payload: IUserModel): IUserState => ({ ...state, ...payload, ...successCacheState() }),
)

reducers.on(
  checkUserAuthenticationStartAction,
  (state: IUserState): IUserState => ({ ...state, ...fetchingCacheState }),
)

reducers.on(
  checkUserAuthenticationErrorAction,
  (): IUserState => ({ ...initialState, authChecked: true, ...errorCacheState() }),
)

reducers.on(
  checkUserAuthenticationSuccessAction,
  (state: IUserState, payload: IUserModel): IUserState => ({
    ...state,
    ...payload,
    authChecked: true,
    ...successCacheState(),
  }),
)

reducers.on(logoutUserStartAction, (state: IUserState): IUserState => ({ ...state, ...fetchingCacheState }))

reducers.on(logoutUserSuccessAction, (): IUserState => ({ ...initialState, ...successCacheState() }))

reducers.on(logoutUserErrorAction, (state: IUserState): IUserState => ({ ...state, ...errorCacheState() }))

export default reducers
