import * as React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Hidden, IconButton, Select, Theme, MenuItem } from '@material-ui/core'
import { Menu as MenuIcon, Input as InputIcon } from '@material-ui/icons'
import i18next from 'i18next'

import { url } from '@src/helpers/constants'
import * as style from './style.styl'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
}))

interface IProps {
  className?: string
  onSidebarOpen: () => void
}

const Topbar: React.FC<IProps> = (props) => {
  const { className, onSidebarOpen, ...rest } = props

  const [language, changeLanguage] = React.useState(i18next.language)

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    changeLanguage(value)
    i18next.changeLanguage(value)
  }

  const classes = useStyles('')

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Link to={url.main}>StartUp Ready App</Link>
        <div className={classes.flexGrow} />
        <Hidden lgUp>
          <IconButton role="button" className={style.icon} onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Select
          onChange={handleChangeLanguage}
          disableUnderline
          className={style.icon}
          value={language}
          inputProps={{
            name: 'language',
            id: 'language',
            classes: {
              icon: style.icon,
            },
          }}
        >
          <MenuItem value={'en'}>EN</MenuItem>
          <MenuItem value={'ru'}>RU</MenuItem>
        </Select>
        <Link role="button" to={url.logout}>
          <IconButton className={style.icon}>
            <InputIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
