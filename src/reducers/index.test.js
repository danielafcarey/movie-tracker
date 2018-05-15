import rootReducer from './index.js';

describe('rootReducer', () => {

  it('should match snapshot', () => {
    expect(rootReducer).toMatchSnapshot();
  })
})
