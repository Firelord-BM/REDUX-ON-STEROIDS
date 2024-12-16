const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake(qty){
    return {
        type:CAKE_ORDERED,
        payload: qty
    }
}

function restockCake(qty){
    return{
        type:CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIcecream(qty){
    return{
        type:ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIcecream(qty){
    return{
        type:ICECREAM_RESTOCKED,
        payload:qty
    }
} 


const initialCakeState = {
    numOfCakes:10,
}

const initialIceCreamState = {
    numOfIceCreams:20
}

const cakeReducer = (state = initialCakeState, action) => {
        switch(action.type){
            case CAKE_ORDERED:
                return{
                    ...state,
                    numOfCakes:state.numOfCakes - action.payload
                }
            case CAKE_RESTOCKED:
                    return{
                        ...state,
                        numOfCakes:state.numOfCakes + action.payload
                    }
            default:
                return state
        }  
}


const icecreamReducer = (state = initialIceCreamState, action) => {
            switch(action.type){
                case ICECREAM_ORDERED:
                    return{
                        ...state,
                        numOfIceCreams:state.numOfIceCreams - action.payload
                    }
                case ICECREAM_RESTOCKED:
                    return{
                        ...state,
                        numOfIceCreams:state.numOfIceCreams + action.payload
                    }
                default:
                    return state
            }
}
const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream:icecreamReducer
    
})
const store = createStore(rootReducer,applyMiddleware(logger))
console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({orderCake,restockCake,orderIcecream,restockIcecream}, store.dispatch)
actions.orderCake(3)
actions.restockCake(3)

actions.orderIcecream(3)
actions.restockIcecream(4)
unsubscribe()

