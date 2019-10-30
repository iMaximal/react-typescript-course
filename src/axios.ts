import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { Store } from 'redux'
import { ReduxDispatch, history } from '@store/store'
import { showNotificationAction } from '@store/notification/notification.actions'
import { checkAuthentication } from '@store/user/user.effects'
import { url } from '@src/helpers/constants'

export const requestInterceptor = () => {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.baseURL = process.env.BACKEND_URL

    config.withCredentials = true

    return config
  })
}

export const responseInterceptor = (store: Store) => {
  axios.interceptors.response.use(
    (response) => response,
    (e: AxiosError) => {
      if (axios.isCancel(e)) {
        return Promise.reject(e)
      }

      store.dispatch(showNotificationAction(e))

      if (e.response && e.response.status) {
        if (e.response.status === 403) {
           (store.dispatch as ReduxDispatch)(checkAuthentication())
           history.push(url.main)
        }
      }

      throw e
    },
  )
}
