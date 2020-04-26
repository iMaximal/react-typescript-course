import { errorCacheState, initialCacheState, successCacheState, validDataFetched } from '@src/cache'

describe('cache functions', () => {
  describe('validDataFetched', () => {
    it('should return false for initial cache state', () => {
      expect(validDataFetched(initialCacheState())).toBeFalsy()
    })

    it('should return false if loaded and force is true', () => {
      const calculatedState = {
        ...initialCacheState(),
        loaded: true,
      }
      expect(validDataFetched(calculatedState, true)).toBeFalsy()
    })

    it('should return false if loaded and failed is true', () => {
      const calculatedState = {
        ...initialCacheState(),
        failed: true,
      }
      expect(validDataFetched(calculatedState, true)).toBeFalsy()
    })

    it('should return true if loaded and failed is false', () => {
      const calculatedState = {
        ...initialCacheState(),
        failed: false,
      }
      expect(validDataFetched(calculatedState, true)).toBeFalsy()
    })
  })

  describe('successCacheState', () => {
    it('should return correct state with current time', () => {
      expect(successCacheState()).toEqual({
        loading: false,
        loaded: true,
        failed: false,
        lastUpdate: new Date(),
      })
    })
  })

  describe('errorCacheState', () => {
    it('should return correct state', () => {
      expect(errorCacheState()).toEqual({
        loading: false,
        loaded: false,
        failed: true,
      })
    })
  })

  describe('fetchingCacheState', () => {
    it('should return correct state', () => {
      expect(errorCacheState()).toEqual({
        loading: false,
        loaded: false,
        failed: true,
      })
    })
  })
})
