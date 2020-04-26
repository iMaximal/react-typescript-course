import { ICacheState } from '@src/interfaces'

export const validDataFetched = (state: ICacheState, force: boolean = false): boolean =>
  !force && state.loaded && !state.failed

export const successCacheState = (): ICacheState => ({
  loading: false,
  loaded: true,
  failed: false,
  lastUpdate: new Date(),
})
export const errorCacheState = (): ICacheState => ({ loading: false, loaded: false, failed: true })
export const fetchingCacheState = (): ICacheState => ({ loading: true, loaded: false, failed: false })

export const initialCacheState = (): ICacheState => ({
  loading: false,
  loaded: false,
  failed: false,
  lastUpdate: null,
})
