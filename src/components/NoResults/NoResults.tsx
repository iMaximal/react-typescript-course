import React from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

interface IProps {
  id: string
  className?: string
}

const NoResults: React.FC<IProps> = ({ id, className }) => {
  const { t } = useTranslation()

  return (
    <div id={id} className={clsx('silent-text', className)}>
      {t('noResults')}
    </div>
  )
}

export default NoResults
