import * as React from 'react'
import clsx from 'clsx'
import { Theme, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'

import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Breadcrumbs from '@components/Breadcrumbs'

import * as style from './style.styl'
import Blocker from '@components/Blocker'
import Colors from '@components/Colors'
import SEO from '@components/SEO/SEO'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
}))

interface IProps {
  children: React.ReactNode
}

const Main: React.FC = (props: IProps) => {
  const { children } = props

  const classes = useStyles('')
  const theme: Theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  })

  const [openSidebar, setOpenSidebar] = React.useState(false)

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  const shouldOpenSidebar = isDesktop ? true : openSidebar

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <SEO />
      <Colors />
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar onClose={handleSidebarClose} open={shouldOpenSidebar} variant={isDesktop ? 'persistent' : 'temporary'} />
      <Breadcrumbs />
      <div className={style.container}>{children}</div>
      <Blocker />
    </div>
  )
}

export default Main
