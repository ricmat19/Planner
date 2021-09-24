import {configureStore} from '@reduxjs/toolkit';
import toDosReducer from './features/toDoSlice';
import booksReducer from './features/toDoSlice';
import reposReducer from './features/toDoSlice';
import filesReducer from './features/toDoSlice';
import recipesReducer from './features/toDoSlice';

export default configureStore({
    reducer: {
        toDos: toDosReducer,
        books: booksReducer,
        repos: reposReducer,
        files: filesReducer,
        recipes: recipesReducer
    }
})