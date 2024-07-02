import {configureStore} from '@reduxjs/toolkit'
//const reduxLogger = require('redux-logger')
import cakeReducer from './features/cake/cakeSlice'
import icecreamReducer from './features/icecream/icecreamSlice'
import userReducer  from './features/user/userSlice'

//const logger = reduxLogger.createLogger()

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        user: userReducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store