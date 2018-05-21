import React from 'react';
import { apiKey } from './apiKey.js'; 
import { 
  mockMovies,
  mockUsers, 
  mockFavorites
} from './mockData';
import { 
  fetchMovies,
  fetchUsers,
  fetchFavorites,
  postFavorite,
  deleteFavorite
} from './apiCalls';

describe('apiCalls', () => {

  describe('fetchMovies', () => {

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockMovies)
      }));
    }); 

    it('should call fetch with the correct arguments', async () => {
      const expected = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
      
      fetchMovies();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return the correct data', async () => {
      const expected = mockMovies;
      const result =  await fetchMovies();

      expect(result).toEqual(expected);
    });

    it('should throw an error if the status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }));

      const expected = Error('Status failure: 500');
      const result = fetchMovies();

      
      expect(result).rejects.toEqual(expected); 
    });
    
    it('should throw an error if the fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failed')));
      
      const expected = Error('Fetch failed');
      const result = fetchMovies();
      
      expect(result).rejects.toEqual(expected);
    });

  });

  describe('fetchUsers', () => {

    it('calls fetch with the correct arguments', () => {
      window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockUsers)
      }));
      const expected = 'http://localhost:3000/api/users';

      fetchUsers();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('returns the correct data', async () => {
      const expected = mockUsers.data

      const result = await fetchUsers();

      expect(result).toEqual(expected);
    });

    it('throws an error if the status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }));
      const expected = Error('Error: 500');
      const result = fetchUsers()

      expect(result).rejects.toEqual(expected)
    });

    it('throws an error if the fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject('Fetch Failed'));

      const expected = Error('Fetch Failed');
      const result = fetchUsers()

      expect(result).rejects.toEqual(expected)
    });

  });

  describe('fetchFavorites', () => {
    let url;
    let id;

    beforeEach(() => {
      id = 1
      url = `http://localhost:3000/api/users/${id}/favorites`
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockFavorites)
      }));
    }); 

    it('should call fetch with the correct arguments', async () => {

      fetchFavorites(id);

      expect(window.fetch).toHaveBeenCalledWith(url)
    });

    it('should return the correct data', async () => {
      const expected = mockFavorites.data

      const result = await fetchFavorites(id);

      expect(result).toEqual(expected);
    });

    it('should throw an error if the status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }));
      const expected = Error('Error: 500');
      const result = fetchFavorites(id)

      expect(result).rejects.toEqual(expected)
    });

    it('should throw an error if the fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject('Fetch Failed'));

      const expected = Error('Fetch Failed');
      const result = fetchFavorites()

      expect(result).rejects.toEqual(expected)
    });
  });

  describe('postFavorite', () => {
    let url;
    let userId;
    let mockMovie;
    let mockFavorite;
    let mockOptionsObject;

    beforeEach(() => {
      userId = 1
      url = `http://localhost:3000/api/users/favorites/new`
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
      }));

      mockMovie = {
        movie_id: 9, 
        title: 'Movie Movie',
        vote_average: 100,
        poster_path: 'http://url.picture.com',
        favorite: true,
        release_date: '2018-10-08',
        overview: ''
      }
      mockFavorite = Object.assign({}, mockMovie, { user_id: userId }); 
      mockOptionsObject = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockFavorite)
      } 
    }); 

    it('should call fetch with the correct arguments', async () => {

      await postFavorite(userId, mockMovie);

      expect(window.fetch).toHaveBeenCalledWith(url, mockOptionsObject); 
    });

    it('should throw an error if the status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
      }));

      const expected = Error('Error: 500');
      const result = postFavorite(userId, mockMovie); 

      expect(result).rejects.toEqual(expected);
    });

    it('should throw an error if the fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject('Fetch Failed'));

      const expected = Error('Fetch Failed');
      const result = postFavorite(userId, mockMovie);

      expect(result).rejects.toEqual(expected);
    });

  });

  describe('postUser', () => {

    it('should call fetch with the correct arguments', async () => {
      
    });

    it('should return the correct data', async () => {

    });

    it('should throw an error if the status is not ok', () => {

    });

    it('should throw an error if the fetch failed', () => {

    });

  });

  describe('deleteFavorite', () => {
    let userId;
    let movieId;
    let url;
    let mockOptionsObject;

    beforeEach(() => {
      userId = 1;
      movieId = 2;
      url = `http://localhost:3000/api/users/${userId}/favorites/${movieId}` 
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
      }))
      mockOptionsObject = {
        method: 'DELETE',
      }
    })

    it('calls fetch with the correct arguments', async () => {
      await deleteFavorite(userId, movieId);

      expect(window.fetch).toHaveBeenCalledWith(url, mockOptionsObject);
    });

    it('should throw an error if the status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('Error: 500');
      const result = deleteFavorite(userId, movieId);

      expect(result).rejects.toEqual(expected);
    });

    it('should throw an error if the fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject('Fetch failed'));
      const expected = Error('Fetch failed');
      const result = deleteFavorite(userId, movieId);

      expect(result).rejects.toEqual(expected);
    });

  });


});
