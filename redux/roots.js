import { all,  } from 'redux-saga/effects';
import { watchFetchProducts } from  './sAgA'

export default function* rootSaga() {
  yield all([(watchFetchProducts())
  ]);
}