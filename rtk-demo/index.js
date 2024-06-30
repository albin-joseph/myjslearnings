const store = require('./app/store')
const cakeActions = require('./app/features/cake/cakeSlice').cakeActions
const icecreamActions = require('./app/features/icecream/icecreamSlice').icecreamActions
const fetchUsers = require('./app/features/user/userSlice').fetchUsers

console.log('initial state', store.getState())
const unsubscribe = store.subscribe(()=>{
    console.log('update store', store.getState())
})

store.dispatch(fetchUsers())

// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.restocked(10))

// store.dispatch(icecreamActions.ordered())
// store.dispatch(icecreamActions.ordered())
// store.dispatch(icecreamActions.ordered())
// store.dispatch(icecreamActions.restocked(5))

//unsubscribe()

