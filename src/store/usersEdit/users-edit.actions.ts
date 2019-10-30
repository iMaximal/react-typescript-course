import { createAction } from 'redux-act'
import { IUserModel } from '@interfaces/index'

export const fetchUserByIdStartAction = createAction('Fetch by ID/User/Start')
export const fetchUserByIdSuccessAction = createAction<IUserModel>('Fetch by ID/User/Success')
export const fetchUserByIdErrorAction = createAction('Fetch by ID/User/Error')

export const saveUserStartAction = createAction('Save/User/Start')
export const saveUserSuccessAction = createAction('Save/User/Success')
export const saveUserErrorAction = createAction('Save/User/Error')
