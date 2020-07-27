import React from 'react';
import { shallow } from 'enzyme';
import GroupMembers from '../components/GroupMembers';

let wrapper, group, members;

describe('<GroupMembers />', () => {
    beforeAll(() => {
        group = {
            id: 132,
            group_name: 'Volunteers',
            updated_at: '2019-07-20 22:05:47',
            created_at: '2019-07-20 22:05:47'
        };
        members = [
            {
                id: 132,
                first_name: 'Macie',
                last_name: 'Emmerich',
                email_address: 'cremin.marjory@hotmail.com',
                status: 'active',
                updated_at: '2019-07-20 22:05:47',
                created_at: '2019-07-20 22:05:47'
            }
        ];
        wrapper = shallow(<GroupMembers group={group} members={members} />);
    });

    test('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
