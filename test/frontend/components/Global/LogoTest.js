import '../../../globalTest';

const Logo = loadComponent('Global/Logo');
const Wrapper = setup(Logo);

describe('<Logo />', () => {
  it('should renders header', () => {
    const div = Wrapper.find('div');
    const img = Wrapper.find('img');
    const actualSrc = img.props().src;
    const expectedSrc = 'themes/Default/images/logo.png';

    assert.isTrue(exists(div), 'div should exists');
    assert.isTrue(exists(img), '1 image should exists');
    assert.isTrue(equals(actualSrc, expectedSrc), 'actualSrc should match expectedSrc');
  });
});
