import rootReducer from './index.js';

describe('rootReducer', () => {

  it('matches snapshot', () => {
    expect(rootReducer).toMatchSnapshot();
  })
})
