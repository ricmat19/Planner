import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toDos: []
}

const toDoSlice = createSlice({
    name: "toDos",
    initialState,
    reducers: {
        saveToDos: (state, action) => {
            state.toDos.push(action.payload)
        }
    }
});

export const {saveToDos} = toDoSlice.actions
export default toDoSlice.reducer