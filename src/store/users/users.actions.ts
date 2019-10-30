import { createAction } from 'redux-act'
import { IUserModel } from '@interfaces/index'

export const fetchUsersStartAction = createAction('Fetch/Users/Start')
export const fetchUsersSuccessAction = createAction<IUserModel[]>('Fetch/Users/Success')
export const fetchUsersErrorAction = createAction('Fetch/Users/Error')

export const cleanUsersAction = createAction('Clean/Users')
