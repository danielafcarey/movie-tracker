import { apiKey } from './apiKey';

const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data
    } else {
      throw new Error(`Status failure: ${response.status}`)
    }
  } catch (error) {
    throw error;
  }
} 

export {
  fetchMovies,
}
