import { mount, shallow, render } from 'enzyme'
import React, { Suspense } from 'react'
import { Switch, Redirect, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'

import { getMockedStore } from '@mocks/state.mock'
import i18nMock from '@mocks/i18n.mock'
import { routeMock } from '@mocks/route.mock'

import { App, AppContainer } from '@src/App'
import Dashboard from '@pages/Dashboard'
import Notification from '@components/Notification'
import RouteWithLayout from '@components/RouteWithLayout'
import Login from '@pages/Login'
import Logout from '@pages/Logout'
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage'

const props = {
  authChecked: true,
  isAuthenticated: true,
  checkAuthentication: jest.fn(),
  ...routeMock({}),
}

describe('<App />', () => {
  describe('how to wrap AppContainer', () => {
    it('should work', () => {
      const wrapper = mount(
        <Provider store={getMockedStore({})}>
          <I18nextProvider i18n={i18nMock}>
            <MemoryRouter>
              <AppContainer {...props} />
            </MemoryRouter>
          </I18nextProvider>
        </Provider>,
      )
      expect(wrapper).toBeDefined()
    })
  })

  describe('App component without wrappers', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<App {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  it('should contain specific components if user is logged in via shallow (search by Text)', () => {
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('ThemeProvider')).toHaveLength(1)
    expect(wrapper.find('Suspense')).toHaveLength(1)
    expect(wrapper.find('withI18nextTranslation(Connect(Notification))')).toHaveLength(1)
    expect(wrapper.find('Switch')).toHaveLength(1)
    expect(wrapper.find('RouteWithLayout')).toHaveLength(6)
    expect(wrapper.find('Redirect')).toHaveLength(3)
  })

  it('should contain specific components if user is not logged in (search by Component is preferable)', () => {
    const calculatedProps = {
      ...props,
      isAuthenticated: false,
    }

    const wrapper = shallow(<App {...calculatedProps} />)
    expect(wrapper.find(ThemeProvider)).toHaveLength(1)
    expect(wrapper.find('Suspense')).toHaveLength(1)
    expect(wrapper.find(Notification)).toHaveLength(1)
    expect(wrapper.find(Switch)).toHaveLength(1)
    expect(wrapper.find(RouteWithLayout)).toHaveLength(2)
    expect(wrapper.find(Redirect)).toHaveLength(1)
  })

  describe('App via mount', () => {
    it('should call checkAuthentication when mounted', () => {
      mount(
        <MemoryRouter>
          <Provider store={getMockedStore({})}>
            <App {...props} />
          </Provider>
        </MemoryRouter>,
      )
      expect(props.checkAuthentication).toHaveBeenCalledTimes(1)
    })

    it('should contain specific components if user is logged in via mount', () => {
      const wrapper = mount(
        <MemoryRouter>
          <Provider store={getMockedStore({})}>
            <App {...props} />
          </Provider>
        </MemoryRouter>,
      )
      expect(wrapper.find(ThemeProvider)).toHaveLength(1)
      expect(wrapper.find(StylesProvider)).toHaveLength(1)
      expect(wrapper.find(Notification)).toHaveLength(1)
      expect(wrapper.find(Switch)).toHaveLength(1)
      expect(wrapper.find(RouteWithLayout)).toHaveLength(1)
      expect(wrapper.find(Dashboard)).toHaveLength(1)
      expect(wrapper.find(Login)).toHaveLength(0)
      expect(wrapper.find(Logout)).toHaveLength(0)
    })

    it('should contain specific components if user is not logged in via mount', () => {
      const calculatedProps = {
        ...props,
        isAuthenticated: false,
      }

      const wrapper = mount(
        <MemoryRouter>
          <Provider store={getMockedStore({})}>
            <App {...calculatedProps} />
          </Provider>
        </MemoryRouter>,
      )
      expect(wrapper.find(ThemeProvider)).toHaveLength(1)
      expect(wrapper.find(StylesProvider)).toHaveLength(1)
      expect(wrapper.find(Notification)).toHaveLength(1)
      expect(wrapper.find(Switch)).toHaveLength(1)
      expect(wrapper.find(RouteWithLayout)).toHaveLength(1)
      expect(wrapper.find(Dashboard)).toHaveLength(0)
      expect(wrapper.find(Login)).toHaveLength(1)
      expect(wrapper.find(Logout)).toHaveLength(0)
    })

    test('invalid path should redirect to 404', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/unknown']}>
          <Provider store={getMockedStore({})}>
            <App {...props} />
          </Provider>
        </MemoryRouter>,
      )

      expect(wrapper.find(ThemeProvider)).toHaveLength(1)
      expect(wrapper.find(StylesProvider)).toHaveLength(1)
      expect(wrapper.find(Notification)).toHaveLength(1)
      expect(wrapper.find(Switch)).toHaveLength(1)
      expect(wrapper.find(RouteWithLayout)).toHaveLength(1)
      expect(wrapper.find(Dashboard)).toHaveLength(0)
      expect(wrapper.find(NotFoundPage)).toHaveLength(1)
      expect(wrapper.find(Login)).toHaveLength(0)
      expect(wrapper.find(Logout)).toHaveLength(0)
    })

    it('should not show components if authChecked is false', () => {
      const calculatedProps = {
        ...props,
        authChecked: false,
      }

      const wrapper = mount(
        <MemoryRouter>
          <Provider store={getMockedStore({})}>
            <App {...calculatedProps} />
          </Provider>
        </MemoryRouter>,
      )

      expect(wrapper.find(ThemeProvider)).toHaveLength(1)
      expect(wrapper.find(StylesProvider)).toHaveLength(1)
      expect(wrapper.find(Notification)).toHaveLength(1)
      expect(wrapper.find(Switch)).toHaveLength(0)
      expect(wrapper.find(RouteWithLayout)).toHaveLength(0)
      expect(wrapper.find(Dashboard)).toHaveLength(0)
      expect(wrapper.find(Login)).toHaveLength(0)
      expect(wrapper.find(Logout)).toHaveLength(0)
    })
  })
})
