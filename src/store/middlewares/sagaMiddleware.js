import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const sagas = [];
export function registerSaga(saga) {
  sagas.push(saga());
  // eslint-disable-next-line
  console.log(
    `%c${saga.name}`,
    'color: blue',
    `(${sagas.length})`,
    'has been initiated.'
  );
}

export function* rootSaga() {
  yield all(sagas);
}

export const sagaMiddleware = createSagaMiddleware();
