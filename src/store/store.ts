import { createBrowserHistory } from 'history'
import reduxThunk, { ThunkDispatch } from 'redux-thunk'
import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import * as reducers from '@store/reducers'
import { IRootState } from '@src/interfaces'

const composeEnhancers =
  process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

export const history = createBrowserHistory()
export const store = createStore(
  combineReducers({ ...reducers, form: formReducer, router: connectRouter(history) }),
  composeEnhancers(applyMiddleware(reduxThunk, routerMiddleware(history))),
)

export type ReduxDispatch = ThunkDispatch<IRootState, any, AnyAction>
