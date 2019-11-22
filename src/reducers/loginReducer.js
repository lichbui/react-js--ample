import {  LOGIN_SUCCESS,  LOGIN_FAIL} from '../configs/actionType'
import { AUTH_INFO } from "../configs/const";

const defaultState = {
    data: {},
    error: "Login error"
}

export default (state = defaultState, actions) => {
    const data = actions.payload
    state.type = actions.type
    switch(actions.type) {
        case LOGIN_SUCCESS: {
            localStorage.setItem(AUTH_INFO, JSON.stringify(data))
            return {
                ...state,
                data,
            }
        }

        case LOGIN_FAIL: {
            return {
                ...state,
                error: data.message,
            }
        }

        default: 
        return state
    }
}