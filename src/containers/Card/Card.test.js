import Card from './Card'
import { shallow } from 'enzyme'
import React from 'react'

describe('Card', () => {

  it('matches the snapshot', () => {
    const mockProps = {
      id: 2342342,
      title: 'The Mighty Gasbag',
      rating: 100,
      image: 'www.flatulence.com/image/123132.png',
      favorite: true
    }
    const wrapper = shallow(<Card {...mockProps} />)

    expect(wrapper).toMatchSnapshot();
  })
})