import axios, {
  AxiosResponse,
  CancelToken,
} from 'axios'
import {
  fetchUsersStartAction,
  fetchUsersSuccessAction,
  fetchUsersErrorAction,
} from '@store/users/users.actions'
import { endpoint } from '@src/helpers/constants'
import { validDataFetched } from '@src/cache'
import { IUserModel } from '@src/interfaces'

export const fetchUsers = (cancelToken: CancelToken, force = false, search = '') => async (dispatch, getState) => {
  if (validDataFetched(getState().users, force)) {
    return
  }

  dispatch(fetchUsersStartAction())

  try {
    const response: AxiosResponse<IUserModel[]> = await axios.get<IUserModel[]>(
      `${endpoint.users}/${search}`,
      { cancelToken },
    )

    dispatch(fetchUsersSuccessAction(response.data))
  } catch (error) {
    if (error.__CANCEL__) {
      return
    }

    dispatch(fetchUsersErrorAction())

    throw error
  }
}
