import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {ADD_IMAGE, SET_COUNT} from '../actions'

function imageReducer(state = [], action) {
    switch (action.type) {
        case ADD_IMAGE:
            return action.imageObject
        case SET_COUNT:
            return action.dataCount
        default:
            return state
    }
}

export default combineReducers({
    routing: routerReducer,
    image: imageReducer
})
