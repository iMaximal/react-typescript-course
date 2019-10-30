import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SignupForm from '@src/forms/SignupForm'

import { signup } from '@store/user/user.effects'
import { IRootState, ISignupRequest, IUserState } from '@src/interfaces'

const Signup: React.FC = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (data: ISignupRequest) => {
    await dispatch(signup(data))
  }

  const { loading } = useSelector<IRootState, IUserState>((state) => state.user)

  return <SignupForm onSubmit={handleSubmit} isSubmitting={loading} />
}

export default Signup
