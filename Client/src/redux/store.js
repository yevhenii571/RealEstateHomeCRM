import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import roleReducer from './roleSlice';
import imageReducer from './imageSlice';
import userReducer from './localSlice';
import routeReducer from './routeSlice';
import advanceSearchSlice from './advanceSearchSlice';
import leadSlice from './leadSlice'
import propertyCustomFiledSlice from './propertyCustomFiledSlice';
import propertySlice from './propertySlice';

const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    serializableCheck: false,
  });
};

const userPersistConfig = {
  key: 'userDetails',
  storage,
};
const routePersistConfig = {
  key: 'route',
  storage,
};
const imagesPersistConfig = {
  key: 'image',
  storage,
};

export const store = configureStore({
  reducer: {
    roles: persistReducer(userPersistConfig, roleReducer),
    images: persistReducer(imagesPersistConfig, imageReducer),
    user: userReducer,
    route: persistReducer(routePersistConfig, routeReducer),
    advanceSearchData: advanceSearchSlice,
    leadData: leadSlice,
    propertyCustomFiled: propertyCustomFiledSlice,
    propertyData: propertySlice,
  },
  middleware,
});

export const persistor = persistStore(store);
