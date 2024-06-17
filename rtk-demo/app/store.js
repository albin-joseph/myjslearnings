const configureStore = require('@reduxjs/toolkit').configureStore
const cakeReducer = require('../app/features/cake/cakeSlice')

const store = configureStore({
    reducer: {
        cake: cakeReducer
    }
})