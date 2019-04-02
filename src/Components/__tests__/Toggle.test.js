import Toggle from '../Header/Toggle/Toggle';
import React from 'react'
import { shallow, configure} from 'enzyme'


import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


describe('<Toggle/>', () => {

    it('state of showSign in should be true', () => {
        const wrapper = shallow(<Toggle/>);
        const button = wrapper.find('button');
        wrapper.update();

        button.at(0).simulate('click');
        expect(wrapper.instance().state.showSign).toEqual(true)
    })

    it('state of showSign to be false', () => {
        const wrapper = shallow(<Toggle/>);
        const button = wrapper.find('button');
        wrapper.update();

        button.at(1).simulate('click');
        expect(wrapper.instance().state.showSign).toEqual(false)
    })
})