export interface IUserModel {
  userId: number
  username: string
  password?: string
  email: string
  role: string
  status: number
  createdAt?: string
  updatedAt?: string
  colors?: {
    [className: string]: string,
  }
}
