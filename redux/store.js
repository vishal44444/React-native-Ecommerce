import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootreducer'; 
import createSagaMiddleware from 'redux-saga';
import rootSaga from './roots';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // ✅ Disable thunk if you're only using saga
      serializableCheck: false, // ✅ Optional: disables strict serializable checks
    }).concat(sagaMiddleware),
  devTools: true, // ✅ Enable Redux DevTools
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export the store
export default store;
