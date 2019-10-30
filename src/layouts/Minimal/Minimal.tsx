import * as React from 'react'
import clsx from 'clsx'

import * as style from './style.styl'
import SEO from '@components/SEO/SEO'

interface IMinimalProps {
  children: React.ReactNode
  className?: string
}

const Minimal: React.FC = (props: IMinimalProps) => {
  const { className, children } = props

  const containerClass = clsx(style.root, className)

  return (
    <div className={containerClass}>
      <SEO />
      <main className={style.content}>{children}</main>
    </div>
  )
}

export default Minimal
