import React from 'react';
import { shallow } from "enzyme";
import Badge from '../badge';

describe('Layout', () => {
    test('Badge has a children', () => {
        const wrapper = shallow(
            <Badge badgeContent={1} color={"red"}>
                <div className="unique" />
            </Badge>
        );
        expect(wrapper.contains(<div className="unique" />)).toEqual(true);
    })
});
