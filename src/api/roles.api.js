import { apiUrl, token, apiMaxTime } from '../config.json' 
import {handleResponse, requestTimeout} from '../helpers'

export const rolesApi = {
    _get,
    _add,
    _update,
    _delete,
};
async function _get() {

    let app_token = sessionStorage.getItem(token);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'roles', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}


async function _add(data) {
    let app_token = sessionStorage.getItem(token);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'roles', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _update(data) {
    let app_token = sessionStorage.getItem(token);
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'roles/'+data?._id, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _delete(id) {
    let app_token = sessionStorage.getItem(token);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'roles/'+id, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
