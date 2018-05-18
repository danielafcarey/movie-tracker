import { userReducer } from './userReducer';

describe('userReducer', () => {

  it('returns previous state if the action type is invalid', () => {
    const action = {
      type: 'DATER_TATER'
    }

    const expected = null;
    const result = userReducer(undefined, action);

    expect(result).toEqual(expected);
  })

  it('returns new state when given an action type of UPDATE_CURRENT_USER', () => {
    const action = {
      type: 'UPDATE_CURRENT_USER',
      id: 1
    }

    const expected = action.id;
    const result = userReducer(undefined, action);

    expect(result).toEqual(expected);
  })
})
