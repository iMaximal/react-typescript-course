import { ICacheState, IUserModel } from '@src/interfaces'

export interface IUserState extends IUserModel, ICacheState {
  authChecked?: boolean
}
