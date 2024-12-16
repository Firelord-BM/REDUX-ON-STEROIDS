const redux = require('redux')
const { createStore, combineReducers, bindActionCreators } = redux
const produce = require('immer').produce

const UPDATE_STREET = 'UPDATE_STREET'
const initialState = {
    name: "John",
    address: {
        street: "123 Main St",
        city: "Anytown",
        state:"CA"
    }
}

function updateStreet(street){
return{
    type: UPDATE_STREET,
    payload:street
}
}
const streetReduce = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_STREET:
            return produce(state,(draft)=>{
                draft.address.street = action.payload
            });
        default:
            return state;
    }
}

const store = createStore(streetReduce)
console.log("Initial State", store.getState())
const action = bindActionCreators({updateStreet}, store.dispatch)

const unsubscribe = store.subscribe(()=>{console.log("Updated State", store.getState())})
action.updateStreet("435 Main Street")
unsubscribe()