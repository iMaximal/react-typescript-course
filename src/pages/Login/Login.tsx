import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from '@forms/LoginForm'

import { login } from '@store/user/user.effects'
import { ILoginRequest, IRootState, IUserState } from '@src/interfaces'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (data: ILoginRequest) => {
    await dispatch(login(data))
  }

  const { loading } = useSelector<IRootState, IUserState>((state) => state.user)

  return <LoginForm onSubmit={handleSubmit} isSubmitting={loading} />
}

export default Login
