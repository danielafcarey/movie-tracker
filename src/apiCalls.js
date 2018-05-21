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
  const url = 'http://localhost:3000/api/users';
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data.data;
    } else {
      throw Error(response.status);
    }
  } catch (error) {
    throw Error(error);
  }

};

const fetchFavorites = async (id) => {
  const url = `http://localhost:3000/api/users/${id}/favorites`;
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data.data;
    } else {
      throw Error(response.status);
    }
  } catch (error) {
    throw Error(error);
  }
}

const postFavorite = async (userId, movie) => {
  const url = `http://localhost:3000/api/users/favorites/new`;
  const favorite = Object.assign({}, movie, { user_id: userId, overview: '' });
  const optionsObject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favorite)
  };

  try {
    const response = await fetch(url, optionsObject);  
    if (response.status !== 200) {
      throw Error(response.status);
    }
  } catch (error) {
    throw Error(error);
  }
}

const deleteFavorite = async (userId, movieId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites/${movieId}`; 
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw Error(response.status)
    }
  } catch(error) {
    throw Error(error);
  }
}

export {
  fetchMovies,
  fetchUsers,
  fetchFavorites,
  postFavorite,
  deleteFavorite
};

