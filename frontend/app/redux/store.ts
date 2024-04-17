import { combineReducers, configureStore as createStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import cartSlice from "./cartSlice";
import userSlice from './userSlice';
import { cartApi } from "./cartApi";

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// Persistor configuration for user slice only
const userPersistConfig = {
  key: 'user', // Use a specific key for user data
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

// Combine reducers, persist only user
const rootReducer = combineReducers({
  cart: cartSlice,
  [cartApi.reducerPath]: cartApi.reducer,
  user: persistedUserReducer,
});

const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }).concat(cartApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };