import { fetchUsers } from './apiCalls';

export const getUserId = async (email) => {
  const users = await fetchUsers();
  const userMatch = await users.find(user => user.email === email)
  return userMatch.id;
}

