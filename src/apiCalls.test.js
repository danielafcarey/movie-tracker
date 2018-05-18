import React from 'react';
import { apiKey } from './apiKey.js'; 
import { 
  mockMovies 
} from './mockData';

import { 
  fetchMovies, 
}from './apiCalls';

describe('apiCalls', () => {

  describe('fetchMovies', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockMovies)
      }))
    }) 

    it('should call fetch with the correct arguments', async () => {
      const expected = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
      
      fetchMovies();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    })

    it('should return the correct data', async () => {
      const expected = mockMovies;
      const result =  await fetchMovies();

      expect(result).toEqual(expected);
    })

    it('should throw an error if the status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))

      const expected = Error('Status failure: 500');
      const result = fetchMovies();

      
      expect(result).rejects.toEqual(expected); 
    })
    
    it('should throw an error if the fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failed')))
      
      const expected = Error('Fetch failed');
      const result = fetchMovies();
      
      expect(result).rejects.toEqual(expected);
    })

  })

  describe('fetchExistingUser', () => {

    it('should call fetch with the correct arguments', async () => {

    })

    it('should return the correct data', async () => {

    })

    it('should throw an error if the status is not ok', () => {

    })

    it('should throw an error if the fetch failed', () => {

    })

  })

  describe('fetchFavorites', () => {

    it('should call fetch with the correct arguments', async () => {

    })

    it('should return the correct data', async () => {

    })

    it('should throw an error if the status is not ok', () => {

    })

    it('should throw an error if the fetch failed', () => {

    })

  })

  describe('addUser', () => {

    it('should call fetch with the correct arguments', async () => {

    })

    it('should return the correct data', async () => {

    })

    it('should throw an error if the status is not ok', () => {

    })

    it('should throw an error if the fetch failed', () => {

    })

  })

  describe('addFavorite', () => {

    it('should call fetch with the correct arguments', async () => {

    })

    it('should return the correct data', async () => {

    })

    it('should throw an error if the status is not ok', () => {

    })

    it('should throw an error if the fetch failed', () => {

    })

  })

  describe('deleteFavorite', () => {

    it('should call fetch with the correct arguments', async () => {

    })

    it('should return the correct data', async () => {

    })

    it('should throw an error if the status is not ok', () => {

    })

    it('should throw an error if the fetch failed', () => {

    })

  })


})
