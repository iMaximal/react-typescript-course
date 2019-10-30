import { ICacheState } from '@src/interfaces'

export const validDataFetched = (state: ICacheState, force: boolean = false) => !force && state.loaded && !state.failed

export const successCacheState = () => ({ loading: false, loaded: true, failed: false, lastUpdate: new Date() })
export const errorCacheState = () => ({ loading: false, loaded: false, failed: true })
export const fetchingCacheState = { loading: true, loaded: false, failed: false }

export const initialCacheState = {
  loading: true,
  loaded: false,
  failed: false,
  lastUpdate: null,
}
