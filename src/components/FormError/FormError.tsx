import * as React from 'react'
import clsx from 'clsx'

import * as style from './style.styl'

interface IProps {
  className?: string
  id: string
  text: string
}

const FormError: React.FC<IProps> = ({ className, id, text }) => {
  if (!text) return null

  return (
    <div id={id} className={clsx(style.content, className)}>
      {text}
    </div>
  )
}

export default FormError
