import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { sagaMiddleware } from './sagaMiddleware';

const applyedMiddlewares = applyMiddleware(
  createLogger({ collapsed: true }),
  sagaMiddleware
);

export default applyedMiddlewares;
