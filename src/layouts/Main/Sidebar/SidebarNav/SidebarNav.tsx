import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { List, ListItem, Button } from '@material-ui/core'

import Can from '@components/Can/Can'
import { IPage } from '@src/layouts/Main/Sidebar/Sidebar'
import * as style from './style.styl'

const CustomRouterLink = React.forwardRef((props: any, ref: React.Ref<HTMLButtonElement>) => (
  <NavLink innerRef={ref} exact={props.to === '/'} {...props} />
))

interface ISideNavProps {
  className?: string
  pages: IPage[]
}

const SidebarNav: React.FC<ISideNavProps> = (props) => {
  const { pages, className } = props

  return (
    <List
      className={clsx({
        [className]: className,
      })}
      role="menu"
    >
      {pages.map((page) => (
        <Can
          key={page.title}
          perform={page.perform}
          yes={() => (
            <ListItem className={style.item} disableGutters>
              <Button
                role="menuitem"
                activeClassName={style.active}
                className={style.button}
                component={CustomRouterLink}
                to={page.href}
              >
                <div className={style.icon}>{page.icon}</div>
                <div className={style.title}>{page.title}</div>
              </Button>
            </ListItem>
          )}
          no={() => null}
        />
      ))}
    </List>
  )
}

export default SidebarNav
