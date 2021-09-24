import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toDos: [],
    books: [],
    repos: [],
    files: [],
    recipes: [],
}

const toDoSlice = createSlice({
    name: "toDos",
    initialState,
    reducers: {
        setToDos: (state, action) => {
            state.toDos.push(action.payload)
        },
        setBooks: (state, action) => {
            state.books.push(action.payload)
        },
        setRepos: (state, action) => {
            state.repos.push(action.payload)
        },
        setFiles: (state, action) => {
            state.files.push(action.payload)
        },
        setRecipes: (state, action) => {
            state.recipes.push(action.payload)
        },
    }
});

export const {setToDos, setBooks, setRepos, setFiles, setRecipes} = toDoSlice.actions;
export const selectToDos = state => state.toDos.toDos;
export default toDoSlice.reducer