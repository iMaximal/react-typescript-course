import { mount, shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import { getMockedStore } from '@mocks/state.mock'
import Dashboard from '@pages/Dashboard'
import i18nMock from '@mocks/i18n.mock'

describe('<Dashboard />', () => {
  it('should match the snapshot', () => {
    const wrapper = mount(
      <Provider store={getMockedStore({})}>
        <I18nextProvider i18n={i18nMock}>
          <Dashboard />
        </I18nextProvider>
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should show access denied if there is no user data', () => {
    const userState = {
      user: null,
    }

    const wrapper = mount(
      <Provider store={getMockedStore(userState)}>
        <I18nextProvider i18n={i18nMock}>
          <Dashboard />
        </I18nextProvider>
      </Provider>,
    )

    expect(wrapper.find('h2').text()).toEqual('Access denied')
  })

  it('should contain specific components', () => {
    const wrapper = shallow(<Dashboard />)
    expect(wrapper.find('SectionHeader').length).toBe(1)
    expect(wrapper.find('main').length).toBe(1)
    expect(wrapper.find('Can').length).toBe(1)
  })
})
