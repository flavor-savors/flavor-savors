import Home from '../Home/Home'
import React from 'react'
import { shallow, configure } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('Home renders the text inside it', () => {
	const wrapper = shallow(<Home />)
	expect(
		wrapper.contains(
			<div className={showHideMealPlan}>
				<PrintWrapper
					plannedRecipes={this.state.plannedRecipes}
					toggleMealPlan={this.toggleMealPlan}
				/>
			</div>
		)
	).to.equal(true)
})
