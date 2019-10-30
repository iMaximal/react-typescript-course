import * as React from 'react'
import { Switch, withRouter, Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'

import RouteWithLayout from '@components/RouteWithLayout'
import Loading from '@components/Loading'
import { Main as MainLayout, Minimal as MinimalLayout } from '@src/layouts/index'
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage'
import { checkAuthentication } from '@store/user/user.effects'
import { theme } from '@theme/index'
import { url } from '@src/helpers/constants'
import Dashboard from '@pages/Dashboard'
import Login from '@pages/Login'
import Logout from '@pages/Logout'
import Notification from '@components/Notification'
import { IRootState } from '@src/interfaces'
import { ReduxDispatch } from '@store/store'

const Signup = React.lazy(() => import('@pages/Signup/Signup'))
const Users = React.lazy(() => import('@pages/Users/Users'))
const UserEdit = React.lazy(() => import('@pages/Users/UserEdit'))
const Chart = React.lazy(() => import('@pages/LineChart/LineChart'))

export type TProps = RouteComponentProps & IMapDispatchToProps & IMapStateToProps

const App: React.FC<TProps> = (props) => {
  const { authChecked, checkAuthentication } = props

  React.useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  let routes = (
    <Switch>
      <RouteWithLayout path={url.login} layout={MinimalLayout} component={Login} />
      <RouteWithLayout path={url.register} layout={MinimalLayout} component={Signup} />
      <Redirect to={url.login} />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <RouteWithLayout exact path={url.main} layout={MainLayout} component={Dashboard} />
        <RouteWithLayout exact path={url.userEdit} layout={MainLayout} component={UserEdit} />
        <RouteWithLayout exact path={url.users} layout={MainLayout} component={Users} />
        <RouteWithLayout exact path={url.lineChart} layout={MainLayout} component={Chart} />
        <RouteWithLayout path={url.logout} layout={MinimalLayout} component={Logout} />
        <Redirect from={url.login} to={url.main} />
        <Redirect from={url.register} to={url.main} />
        <RouteWithLayout exact layout={MinimalLayout} component={NotFoundPage} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <React.Suspense fallback={<Loading />}>
          <Notification />
          {authChecked && routes}
        </React.Suspense>
      </StylesProvider>
    </ThemeProvider>
  )
}

interface IMapStateToProps {
  isAuthenticated: boolean
  authChecked: boolean
}

interface IMapDispatchToProps {
  checkAuthentication: () => Promise<void>
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
  return {
    isAuthenticated: Boolean(state.user && state.user.email),
    authChecked: state.user && state.user.authChecked,
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): IMapDispatchToProps => {
  return {
    checkAuthentication: () => dispatch(checkAuthentication()),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
)
