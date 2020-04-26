import { fetchUsersErrorAction, fetchUsersStartAction, fetchUsersSuccessAction } from '@store/users/users.actions'
import { usersMock } from '@mocks/users.mock'

describe('users actions', () => {
  describe('fetchUsersStartAction', () => {
    it('should create action with following text', () => {
      expect(fetchUsersStartAction()).toEqual({
        error: false,
        payload: undefined,
        type: '[2] Fetch/Users/Start',
      })
    })
  })

  describe('fetchUsersSuccessAction', () => {
    it('should create action with following text', () => {
      expect(fetchUsersSuccessAction(usersMock)).toEqual({
        error: false,
        payload: usersMock,
        type: '[3] Fetch/Users/Success',
      })
    })
  })

  describe('fetchUsersErrorAction', () => {
    it('should create action with following text', () => {
      expect(fetchUsersErrorAction()).toEqual({
        error: false,
        payload: undefined,
        type: '[4] Fetch/Users/Error',
      })
    })
  })
})
