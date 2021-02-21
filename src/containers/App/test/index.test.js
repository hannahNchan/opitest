import { shallow } from 'enzyme';
import App from '../index';

describe('<App />', () => {
  it('should render correctly', () => {
    const renderedComponent = shallow(App);

    expect(renderedComponent).toMatchSnapshot();
  });
});

