import { apiKey } from './apiKey';

const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw Error(`Status failure: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}; 

const fetchUsers = async () => {
  const url = 'http://localhost/3000/api/users';
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data.data;
    } else {
      throw Error(response.status);
    }
  } catch (error) {
    throw error;
  }

};

export {
  fetchMovies,
  fetchUsers
};

