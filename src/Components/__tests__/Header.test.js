
import Header from '../Header/Header'
import React from 'react'
import { shallow, configure,} from 'enzyme'



import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });


describe('<Header/>', () => {
	it('should return 4', () => {
		expect(2 + 2).toBe(4)
	})

	it('state should return true', () => {
		const wrapper = shallow(<Header/>);
		const li = wrapper.find('li');
		wrapper.update();
		// console.log(button)
		li.at(3).simulate('click');
		expect(wrapper.instance().state.showSignIn).toEqual(true)
	})

	it('btn should return true', () => {
		const wrapper = shallow(<Header/>);
		const button = wrapper.find('button');
		wrapper.update();

		button.at(0).simulate('click');
		expect(wrapper.instance().state.showSearch).toEqual(true)
	})

	it('btn should return false', () => {
		const wrapper = shallow(<Header/>);
		const button = wrapper.find('button');
		wrapper.update();

		button.at(0).simulate('closed');
		expect(wrapper.instance().state.showSearch).toEqual(false)
	})

})

