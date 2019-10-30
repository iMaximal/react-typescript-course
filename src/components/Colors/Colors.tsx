import * as React from 'react'
import { IRootState, IUserState } from '@src/interfaces'
import { useSelector } from 'react-redux'

import { updateColors } from '@src/helpers/updateColors'

const Colors: React.FC = () => {
  const { colors } = useSelector<IRootState, IUserState>((state) => state.user)

  if (!colors) return null

  React.useEffect(() => {
    updateColors(colors)
  }, [colors])

  return null
}

export default Colors
