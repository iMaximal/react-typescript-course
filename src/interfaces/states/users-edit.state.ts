import { ICacheState, IUserModel } from '@src/interfaces'

export interface IUsersEditState extends ICacheState {
  data: IUserModel
}
