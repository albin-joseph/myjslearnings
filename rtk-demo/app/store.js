const configureStore = require('@reduxjs/toolkit').configureStore
const cakeReducer = require('../app/features/cake/cakeSlice')
const icecreamReducer = require('../app/features/icecream/icecreamSlice')

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer
    }
})

module.exports = store