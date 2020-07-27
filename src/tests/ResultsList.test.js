import React from 'react';
import { shallow } from 'enzyme';
import ResultsList from '../components/ResultsList';

let wrapper, data;

describe('<ResultsList />', () => {
    beforeAll(() => {
        data = [
            {
                id: 132,
                group_name: 'Volunteers',
                updated_at: '2019-07-20 22:05:47',
                created_at: '2019-07-20 22:05:47'
            }
        ];
        wrapper = shallow(<ResultsList people={[]} groups={data} />);

        wrapper.setState({ data: data });
    });

    test('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
