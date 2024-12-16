const {configureStore} = require('@reduxjs/toolkit')
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: null,
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUESTED
})

const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCEEDED,
    payload: users
})

const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILED,
    payload: error
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}

const fetchUsers = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchUsersRequest())
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            const users = response.data.map(user => user.name)
            dispatch(fetchUsersSuccess(users))
        } catch (error) {
            dispatch(fetchUsersFailure(error.message))
        }
    }
}

// Create store with middleware
const store = configureStore({reducer:reducer})

// Subscribe to store changes
store.subscribe(() => {
    console.log('Current State:', store.getState())
})

// Dispatch async action
store.dispatch(fetchUsers())