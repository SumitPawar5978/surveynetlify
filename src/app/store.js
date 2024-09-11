import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['counter'],  // only counter will be persisted
  // blacklist: ['someOtherReducer'], // someOtherReducer will not be persisted
};

const rootReducer = combineReducers({
  reducer: reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
