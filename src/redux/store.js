import { configureStore } from '@reduxjs/toolkit'
import  AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import savedLocationsReducer from './savedLocations'
import currentLocationReducer from './currentLocation'
import editFunctionsReducer from './editFunctions'


const persistedSavedLocations = {
  key: "locations",
  storage: AsyncStorage
}

const persistedCurrentLocations = {
  key: "currentLocation",
  storage: AsyncStorage
}

const persistedEditFunctions = {
  key: "editFunctions",
  storage: AsyncStorage
}


const persistedReducer1 = persistReducer(persistedSavedLocations, savedLocationsReducer)
const persistedReducer2 = persistReducer(persistedCurrentLocations, currentLocationReducer)
const persistedReducer3 = persistReducer(persistedEditFunctions, editFunctionsReducer)


export const store = configureStore({
  reducer: {
    locations: persistedReducer1,
    currentLocation: persistedReducer2,
    editFunctions: persistedReducer3
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

