import axios from 'axios'
import {
  fetchUserByIdStartAction,
  fetchUserByIdSuccessAction,
  fetchUserByIdErrorAction,
  saveUserStartAction,
  saveUserSuccessAction,
  saveUserErrorAction,
} from '@store/usersEdit/users-edit.actions'
import { history } from '@src/store/store'
import { endpoint, url } from '@src/helpers/constants'
import { handleSubmissionError } from '@src/helpers/error-handler'
import { IUserModel } from '@src/interfaces'
import { cleanUsersAction } from '@store/users/users.actions'
import { showNotificationAction } from '@store/notification/notification.actions'

export const fetchUserById = (userId) => async (dispatch, getState) => {
  dispatch(fetchUserByIdStartAction())

  try {
    const response = await axios.get<IUserModel>(`${endpoint.user}/${userId}`)
    dispatch(fetchUserByIdSuccessAction(response.data))
  } catch (error) {
    dispatch(fetchUserByIdErrorAction())

    throw error
  }
}

export const saveUser = (data: IUserModel) => async (dispatch) => {
  dispatch(saveUserStartAction())

  try {
    await axios.put<IUserModel>(`${endpoint.user}/${data.userId}`, data)

    dispatch(saveUserSuccessAction())
    dispatch(
      showNotificationAction(
        {},
        {
          message: 'User saved.',
          type: 'success',
          timeout: 3,
        },
      ),
    )
    dispatch(cleanUsersAction())
    history.push(url.users)
  } catch (error) {
    dispatch(saveUserErrorAction())
    await handleSubmissionError(error)

    throw error
  }
}
