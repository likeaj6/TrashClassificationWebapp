import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {ADD_IMAGE} from '../actions'

function imageReducer(state = [], action) {
    switch (action.type) {
        case ADD_IMAGE:
            return action.imageObject
        default:
            return state
    }
}

export default combineReducers({
    routing: routerReducer,
    image: imageReducer
})
