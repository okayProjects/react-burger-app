import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({ adapter: new Adapter() });


describe('<Navigation/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItems />)
    });

    it('should render two <NavItems/> if not authenticated', () => {

        expect(wrapper.find(NavItem)).toHaveLength(2);
    });
    it('should render three <NavItems/> if authenticated', () => {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });
})