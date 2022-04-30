import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import { loginReducer } from './message';
import { authReducer } from './AuthSlice';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['message', 'authSlice'],//persisted reducers
    // stateReconciler: autoMergeLevel1,
};
//combined all reducers 
const reducers = combineReducers({
    loginSlice: loginReducer,
    authSlice: authReducer,
});
//persisted all reducers 
const _persistedReducer = persistReducer(persistConfig, reducers);

//store 
const store = configureStore({
    reducer: _persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});
const persistor = persistStore(store);
export { store, persistor }