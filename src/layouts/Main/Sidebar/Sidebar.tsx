import * as React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Drawer, Theme } from '@material-ui/core'
import { Dashboard as DashboardIcon, People as PeopleIcon, ShowChart as ShowChartIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import * as style from './style.styl'

import SidebarNav from './SidebarNav'
import { url } from '@src/helpers/constants'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}))

interface IProps {
  className?: string
  onClose: () => void
  open: boolean
  variant: 'permanent' | 'persistent' | 'temporary'
}

export interface IPage {
  title: string
  href: string
  icon: React.ReactNode
  perform: string
}

const Sidebar: React.FC<IProps> = (props) => {
  const { open, variant, onClose, className, ...rest } = props

  const classes = useStyles('')

  const { t } = useTranslation()

  const pages: IPage[] = [
    {
      title: t('navigation.Dashboard'),
      href: url.main,
      icon: <DashboardIcon />,
      perform: 'dashboard-page:visit',
    },
    {
      title: t('navigation.Users'),
      href: url.users,
      icon: <PeopleIcon />,
      perform: 'users:get',
    },
    {
      title: t('navigation.Line Chart'),
      href: url.lineChart,
      icon: <ShowChartIcon />,
      perform: 'chart:view',
    },
  ]

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div {...rest} className={clsx(style.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  )
}

export default Sidebar
