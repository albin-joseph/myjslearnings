// src/features/form/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: '',
    dob: '',
    dropdown: '',
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setDob: (state, action) => {
            state.dob = action.payload;
        },
        setDropdown: (state, action) => {
            state.dropdown = action.payload;
        },
    },
});

export const { setUsername, setPassword, setDob, setDropdown } = formSlice.actions;
export default formSlice.reducer;
