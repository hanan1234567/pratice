import { AuthConstants as Constants } from '../types'
import {token,expirationDate} from '../../config.json'

let tokens = sessionStorage.getItem(token)
let expire = sessionStorage.getItem(expirationDate)

const initialState = {
    user: {},
    loggedIn: false,
    token: tokens,
    expirationDate:expire
};

export function authReducer(state = initialState, action) {
    switch (action.type) {  
        case Constants.LOGIN:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
                expire: action.payload.expire,
                user: action.payload.user,
            };
            
        case Constants.REFRESH_TOKEN:
            return {
                ...state,
                token: action.payload?.token || null
            }

        case Constants.REFRESH_TOKEN_FAILED:
            return {
                ...state,
                user: null,
                token: null
            }   

        case Constants.SETPROFILE:
            return{
                ...state,
                user: action.payload.user,
            };
       
        case Constants.LOGOUT:
            return{
                ...state,
                loggedIn: false,
                token: null,
                user: {},
            };
                   
        case Constants.FAILED:
            return{
                ...state
            }

        default:
            return state
    }
}