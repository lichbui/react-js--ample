import {postAxios} from '../ultils/fetch'
import { LOGIN_API } from '../configs/api'
import { LOGIN_SUCCESS, LOGIN_FAIL} from '../configs/actionType'
export const loginAction = (loginData = {}) => (dispatch) => {
    postAxios(LOGIN_API, loginData).then(response => {
        const {data} = response;
        dispatch({type: LOGIN_SUCCESS, payload: data})
    }).catch(error=> {
        dispatch({type: LOGIN_FAIL, payload: error})
    })
}