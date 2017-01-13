import '../../../globalTest';

const Header = loadComponent('Global/Header');
const Wrapper = setupRedux(Header);

describe('<Header />', () => {
  it('should renders header with all components', () => {
    const header = Wrapper.find('.Header');
    const wrapper = Wrapper.find('.wrapper');
    const logo = Wrapper.find('.Logo');
    const mainNav = Wrapper.find('.MainNav');
    const search = Wrapper.find('.Search');
    const signIn = Wrapper.find('.SignIn');

    assert.isTrue(exists(header), 'Header should exists');
    assert.isTrue(exists(wrapper), 'wrapper should exists');
    assert.isTrue(exists(logo), 'Logo component should exists');
    assert.isTrue(exists(mainNav), 'MainNav component should exists');
    assert.isTrue(exists(search), 'Search component should exists');
    assert.isTrue(exists(signIn), 'SignIn component should exists');
  });
});
