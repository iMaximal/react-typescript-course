import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router'

const SEO: React.FC<RouteComponentProps> = (props) => {
  const { t } = useTranslation()
  const { path } = props.match

  return (
    <Helmet>
      <title>{t([`seo.${path}.title`, 'seo.defaultTitle'])}</title>
      <meta name="description" content={t([`seo.${path}.description`, 'seo.defaultDescription'])} />
    </Helmet>
  )
}

export default withRouter(SEO)
