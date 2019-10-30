import { IUserModel } from '@interfaces/models/user.model'

// for react-router (path for browser)
export const url = {
  main: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  users: '/users',
  userEdit: '/users/edit/:editUserId',
  lineChart: '/line-chart',
}

// for axios
export const endpoint = {
  register: '/user/register',
  login: '/user/login',
  logout: '/user/logout',
  authenticated: '/user/authenticated',
  users: '/user/all',
  user: '/user',
}

export const defaultColors: IUserModel['colors'] = {
  baseBackground: '#e4e5e6',
  black: '#333333',
  iconSidebar: '#73818f',
  primary: '#20a8d8',
  secondary: '#1985ac',
  sidebarBackground: '#2f353a',
  textPrimary: '#1d1e1f',
  topBarBackground: '#20a8d8',
  topBarIcon: '#FFFFFF',
  white: '#FFFFFF',
}
