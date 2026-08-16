// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice"

// const store = configureStore({
//     reducer:{
//         user:userSlice
//     }
// })

// export default store;



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from './productSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";             

import storageModule from "redux-persist/lib/storage";

const storage = storageModule.default ?? storageModule;

console.log(storage);
console.log(typeof storage.getItem);


const persistConfig = {
  key: "Ekart",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  product:productSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;


