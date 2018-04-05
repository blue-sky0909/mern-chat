/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';
import rootSaga from './sagas';

export function configureStore(initialState = {}) {

  const sagaMiddleware = createSagaMiddleware({});
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
  //  applyMiddleware(sagaMiddleware),
    applyMiddleware(logger)
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));
  // sagaMiddleware.run(rootSaga);
  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
