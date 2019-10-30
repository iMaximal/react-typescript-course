import * as React from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import * as style from './style.styl'

interface IProps {
  className?: string
  icon: React.ReactNode
  id: string
  text: string
}

const SectionHeader: React.FC<IProps> = ({ className, icon, id, text }) => {
  const { t } = useTranslation()

  return (
    <div id={id} className={clsx(style.header, className)}>
      <span className={style.icon}>{icon}</span>
      {t(text)}
    </div>
  )
}

export default SectionHeader
