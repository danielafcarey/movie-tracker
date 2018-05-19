import React from 'react';
import { apiKey } from './apiKey.js'; 
import { 
  mockMovies,
  mockUsers 
} from './mockData';
import { 
  fetchMovies,
  fetchUsers 
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

    it('should call fetch with the correct arguments', async () => {
      
    });

    it('should return the correct data', async () => {

    });

    it('should throw an error if the status is not ok', () => {

    });

    it('should throw an error if the fetch failed', () => {

    });

  });

  describe('addUser', () => {

    it('should call fetch with the correct arguments', async () => {

    });

    it('should return the correct data', async () => {

    });

    it('should throw an error if the status is not ok', () => {

    });

    it('should throw an error if the fetch failed', () => {

    });

  });

  describe('addFavorite', () => {

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

    it('should call fetch with the correct arguments', async () => {

    });

    it('should return the correct data', async () => {

    });

    it('should throw an error if the status is not ok', () => {

    });

    it('should throw an error if the fetch failed', () => {

    });

  });


});
