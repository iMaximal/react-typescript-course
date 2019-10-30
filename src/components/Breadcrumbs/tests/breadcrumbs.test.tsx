import { shallow } from 'enzyme'
import * as React from 'react'

import Breadcrumbs from '../Breadcrumbs'

describe('<Breadcrumbs />', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Breadcrumbs />)
    expect(wrapper).toMatchSnapshot()
  })
})
