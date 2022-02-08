import { combineReducers } from 'redux'
import { authReducer } from './auth.reducer';
import { rolesReducer } from './roles.reducer';
import { usersReducer } from './users.reducer';
import {formularyReducer} from "./formulary.reducer"
export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    formulary:formularyReducer
});

