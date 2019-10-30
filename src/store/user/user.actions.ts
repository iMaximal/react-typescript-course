import { createAction } from 'redux-act'
import { IUserModel } from '@interfaces/index'

export const fetchUserStartAction = createAction('Login/User/Start')
export const fetchUserSuccessAction = createAction<IUserModel>('Login/User/Success')
export const fetchUserErrorAction = createAction('Login/User/Error')

export const signupUserStartAction = createAction('Signup/User/Start')
export const signupUserSuccessAction = createAction<IUserModel>('Signup/User/Success')
export const signupUserErrorAction = createAction('Signup/User/Error')

export const logoutUserStartAction = createAction('Logout/User/Start')
export const logoutUserSuccessAction = createAction('Logout/User/Success')
export const logoutUserErrorAction = createAction('Logout/User/Error')

export const checkUserAuthenticationStartAction = createAction('Check authentication/User/Start')
export const checkUserAuthenticationSuccessAction = createAction<IUserModel>('Check authentication/User/Success')
export const checkUserAuthenticationErrorAction = createAction('Check authentication/User/Error')
