import { createStore } from 'redux'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
  key: 'root', // change this key if necessary
  storage,
  // Whitelist the reducers you want to persist
  whitelist: ['books', 'checkouts', 'reviews', 'user']
}

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the store
const store = createStore(persistedReducer, composeWithDevTools())

// Persist the store
const persistor = persistStore(store)

export { store, persistor }