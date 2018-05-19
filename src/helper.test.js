import { getUserId } from './helper';
import * as apiCalls from './apiCalls';

describe('getUserId', () => {

  it('calls fetchUsers', () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Slagathor',
        password: 'bunnylover',
        email: 'notabunnylover@gmail.com'
      }
    ]

    apiCalls.fetchUsers = jest.fn().mockImplementation(() => {
      return mockUsers;
    })

    getUserId('notabunnylover@gmail.com');

    expect(apiCalls.fetchUsers).toHaveBeenCalled()
  })

  it('returns a user id', () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Slagathor',
        password: 'bunnylover',
        email: 'notabunnylover@gmail.com'
      }
    ]
    apiCalls.fetchUsers = jest.fn().mockImplementation( () => {
      return mockUsers;
    })

    const expected = mockUsers[0].id;

    const result = getUserId('notabunnylover@gmail.com')

    expect(result).toEqual(expected);
  })
})