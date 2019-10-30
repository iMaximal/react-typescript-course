import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Breadcrumbs as MaterialBreadcrumbs, Link, Paper } from '@material-ui/core'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TypographyProps } from '@material-ui/core/Typography/Typography'

import { url } from '@src/helpers/constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    paper: {
      padding: theme.spacing(1, 2),
      borderRadius: 0,
    },
  }),
)

const CustomRouterLink = React.forwardRef((props: any, ref: React.Ref<HTMLLinkElement>) => (
  <NavLink innerRef={ref} exact {...props} />
))

const Breadcrumbs: React.FC<RouteComponentProps> = (props) => {
  const classes = useStyles('')
  const { t } = useTranslation()

  const links = () => {
    const { match } = props

    const lastIndex = Object.values(url).lastIndexOf(match.path)

    return lastIndex > -1
      ? Object.entries(url).map(([key, value], index) => {
          if (match.path.includes(value)) {
            let color: TypographyProps['color'] = 'textPrimary'
            let targetUrl = value

            if (lastIndex === index) {
              color = 'primary'
              // '/users/edit/:editUserId' -> [current url]
              targetUrl = match.url
            }

            return (
              <Link key={key} color={color} component={CustomRouterLink} to={targetUrl} aria-current="page">
                {t([`breadcrumbs.${value}`, 'breadcrumbs.defaultBreadcrumb'])}
              </Link>
            )
          }
        })
      : null
  }

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <MaterialBreadcrumbs aria-label="breadcrumb">{links()}</MaterialBreadcrumbs>
      </Paper>
    </div>
  )
}

export default withRouter(Breadcrumbs)
