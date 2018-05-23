import { mockMovies } from '../mockData';

export const fetchMovies = jest.fn().mockImplementation( () => {
  return Promise.resolve( mockMovies );
});
