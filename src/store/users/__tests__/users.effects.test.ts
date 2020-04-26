import axios from 'axios'
import { noop } from 'lodash-es'

import { getMockedStore } from '@mocks/state.mock'
import * as Actions from '../users.actions'
import * as Effects from '../users.effects'
import { usersMock } from '@mocks/users.mock'

const store = getMockedStore()

const cancelToken = new axios.CancelToken(noop)

jest.mock('axios')
const axiosMock = axios as jest.Mocked<typeof axios>

const response = {
  data: {
    content: [usersMock],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const fetchUsers = Promise.resolve(response)
const fetchUsersMockNoContent = Promise.resolve({
  data: {},
  status: 20,
  statusText: 'OK',
  headers: {},
  config: {},
})

describe('Users commands', () => {
  beforeEach(() => {
    store.clearActions()
    axiosMock.get.mockReset()
    axiosMock.get.mockImplementation(() => fetchUsers)
  })

  describe('Users effects', () => {
    it('should fetch users', async () => {
      const fetchUsersBeginSpy = jest.spyOn(Actions, 'fetchUsersStartAction')
      const fetchUsersSuccessSpy = jest.spyOn(Actions, 'fetchUsersSuccessAction')

      await store.dispatch(Effects.fetchUsers(cancelToken))

      expect(axiosMock.get).toHaveBeenCalledWith('/user/all/', { cancelToken })
      expect(fetchUsersBeginSpy).toBeCalled()
      expect(fetchUsersSuccessSpy).toBeCalled()
    })

    it('should not call fetchUsersErrorAction if an error occurs', async () => {
      axiosMock.get.mockRejectedValueOnce({ __CANCEL__: true })

      const fetchUsersFailureSpy = jest.spyOn(Actions, 'fetchUsersErrorAction')

      await store.dispatch(Effects.fetchUsers(cancelToken))

      expect(fetchUsersFailureSpy).not.toBeCalled()
    })

    it('should fetch users list if no content field', async () => {
      axiosMock.get.mockImplementation(() => fetchUsersMockNoContent)
      const fetchUsersBeginSpy = jest.spyOn(Actions, 'fetchUsersStartAction')
      const fetchUsersSuccessSpy = jest.spyOn(Actions, 'fetchUsersSuccessAction')

      await store.dispatch(Effects.fetchUsers(cancelToken))

      expect(axiosMock.get).toBeCalled()
      expect(fetchUsersBeginSpy).toBeCalled()
      expect(fetchUsersSuccessSpy).toHaveBeenCalledWith({})
    })

    it('should not throw error if request cancelled', async () => {
      axiosMock.get.mockRejectedValueOnce({ __CANCEL__: true })

      const fetchUsersFailureSpy = jest.spyOn(Actions, 'fetchUsersErrorAction')

      await store.dispatch(Effects.fetchUsers(cancelToken))

      expect(fetchUsersFailureSpy).not.toBeCalled()
    })

    it('should handle error', async () => {
      axiosMock.get.mockRejectedValueOnce({})

      const fetchUsersFailureSpy = jest.spyOn(Actions, 'fetchUsersErrorAction')

      try {
        await store.dispatch(Effects.fetchUsers(cancelToken))
      } catch (e) {
        expect(fetchUsersFailureSpy).toBeCalled()
      }
    })
  })
})
