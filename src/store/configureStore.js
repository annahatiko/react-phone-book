import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import middlewares from './middlewares';

import { sagaMiddleware, rootSaga } from './middlewares/sagaMiddleware';

export default function configureStore(initialState) {
  /* eslint-disable no-underscore-dangle */
 const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
       : compose;
    /* eslint-enable */

 const enhancer = composeEnhancers(middlewares);

 const store = createStore(rootReducer, initialState, enhancer);
 sagaMiddleware.run(rootSaga);

 return store;
}
