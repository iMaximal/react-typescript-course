import * as React from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '@store/user/user.effects'

const Logout: React.FC = () => {
  const dispatch = useDispatch()

  const onLogout = React.useCallback(() => dispatch(logout()), [dispatch])

  React.useEffect(() => {
    onLogout()
  }, [onLogout])

  return null
}

export default Logout
