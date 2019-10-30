import { ICacheState, IUserModel } from '@src/interfaces'

export interface IUsersState extends ICacheState {
  list: IUserModel[]
}
