const redux = require('redux')

const UPDATE_STREET = 'UPDATE_STREET'

const initialState = {
    name: "Vishwas",
    address:{
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345"
    }
}

function updateStreet(street){
    return{
        type:UPDATE_STREET,
        payload:street
    }
}

const streetReducer = (state= initialState, action) => {
    switch (action.type) {
        case UPDATE_STREET:
        return{
            ...state,
            address:{
                ...state.address,
                street: action.payload
            }
        }
        default:
            return state
    }
       
}

const store = redux.createStore(streetReducer)
console.log("Initial State", store.getState())
const action = redux.bindActionCreators({updateStreet},store.dispatch)

const unsubcribe = store.subscribe(()=>{console.log("Updated State",store.getState())})
action.updateStreet("435 Main Street")
unsubcribe()