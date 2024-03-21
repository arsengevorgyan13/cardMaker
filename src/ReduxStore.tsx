import {combineReducers, configureStore} from '@reduxjs/toolkit';

import deleteDataReducer from './components/reducers/deleteDataSlice';

const rootReducer = combineReducers({
    deleteData: deleteDataReducer,
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;