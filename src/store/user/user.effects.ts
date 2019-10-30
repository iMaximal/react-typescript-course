import axios from 'axios'

import {
  fetchUserErrorAction,
  fetchUserStartAction,
  fetchUserSuccessAction,
  checkUserAuthenticationErrorAction,
  checkUserAuthenticationStartAction,
  checkUserAuthenticationSuccessAction,
  logoutUserErrorAction,
  logoutUserStartAction,
  logoutUserSuccessAction,
  signupUserSuccessAction,
  signupUserErrorAction,
  signupUserStartAction,
} from '@store/user/user.actions'
import { ILoginRequest, ISignupRequest, IUserModel } from '@src/interfaces'
import { endpoint, url } from '@src/helpers/constants'
import { handleSubmissionError } from '@src/helpers/error-handler'
import { history, ReduxDispatch } from '@store/store'

export const signup = (data: ISignupRequest) => async (dispatch) => {
  dispatch(signupUserStartAction())

  try {
    const response = await axios.post<IUserModel>(endpoint.register, {
      ...data,
    })

    dispatch(signupUserSuccessAction(response.data))
    history.push(url.main)
  } catch (error) {
    dispatch(signupUserErrorAction())
    await handleSubmissionError(error)

    throw error
  }
}

export const login = (data: ILoginRequest) => async (dispatch) => {
  dispatch(fetchUserStartAction())
  const { username, password } = data

  try {
    const response = await axios.post<IUserModel>(endpoint.login, {
      username,
      password,
    })

    dispatch(fetchUserSuccessAction(response.data))
    history.push(url.main)
  } catch (error) {
    dispatch(fetchUserErrorAction())
    await handleSubmissionError(error)

    throw error
  }
}

export const logout = () => async (dispatch) => {
  dispatch(logoutUserStartAction())
  try {
    await axios.get(endpoint.logout)

    dispatch(logoutUserSuccessAction())
    window.location.href = url.login
  } catch (error) {
    dispatch(logoutUserErrorAction())
    history.goBack()

    throw error
  }
}

export const checkAuthentication = () => async (dispatch: ReduxDispatch) => {
  dispatch(checkUserAuthenticationStartAction())
  try {
    const response = await axios.get<IUserModel>(endpoint.authenticated)
    dispatch(checkUserAuthenticationSuccessAction(response.data))
  } catch (error) {
    dispatch(checkUserAuthenticationErrorAction())

    throw error
  }
}
