import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'

import * as style from './style.styl'
import { url } from '@src/helpers/constants'

const CustomRouterLink = React.forwardRef((props: any, ref: React.Ref<HTMLButtonElement>) => (
  <NavLink innerRef={ref} {...props} />
))

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div id="notFound" className={style.container}>
      {t('404.text')}
      <p>
        <Button className={style.mainButton} component={CustomRouterLink} to={url.main} color="primary">
          {t('buttons.main')}
        </Button>
      </p>
    </div>
  )
}

export default NotFoundPage
