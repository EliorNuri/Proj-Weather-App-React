import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session'

import weatherReducer from './reducers/weatherReducer';

const rootReducer = combineReducers({
    weather: weatherReducer,
})

const persistConfig = {
    key: 'root',
    storage: storageSession
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);