import { FormularyConstants as Constants } from '../types'


const initialState = {
    formulary:[]
};

export function formularyReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {  
        case Constants.GET:
            return {
                ...state,
                formulary:JSON.parse(action.payload)
            };
                   
        case Constants.FAILED:
            return{
                ...state
            }

        default:
            return state
    }
}