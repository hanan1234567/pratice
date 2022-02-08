import { apiUrl, token, apiMaxTime} from '../config.json'
import {handleResponse, requestTimeout} from '../helpers'

export const authApi = {
    _login,
    _logout,
    _auth_check,
    _refresh,
    _resend_request,
    _forget_password,
    _check_reset,
    _reset_password
};


async function _logout(){
    const app_token = sessionStorage.getItem("token")
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + app_token
        }        
    };
    return true
    // return requestTimeout(apiMaxTime,fetch(apiUrl + 'logout', requestOptions))
    //             .then(handleResponse)
    //             .then( () => {
    //               //  localStorage.removeItem("token");    
    //              //   sessionStorage.removeItem("expirationDate")
    //                 return true;
    //             });    
}

async function _login(form_data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(form_data)
    };
    // return requestTimeout(apiMaxTime,fetch(apiUrl + 'login', requestOptions))
    //             .then(handleResponse)
    //             .then((response) => {
    //                 if (response.refresh_token) {                
    //                     localStorage.setItem(tokenName, response.refresh_token)
    //                     sessionStorage.setItem(token, response.token)
    //                 }
    //                 return {user: response.user, token: response.token};
    //             });\
     return requestTimeout(apiMaxTime,fetch('https://apiidentity-dev.azurewebsites.net/authentication/authenticate', requestOptions))
                .then(handleResponse)
                .then((response) => {
                    let data=JSON.parse(response)
                    console.log("response:",response)
                    sessionStorage.setItem('token', data.Token)
                    sessionStorage.setItem('expirationDate', data.ExpirationDate)
                    return {token:data.Token,expire:data.ExpirationDate};
                });
}

async function _forget_password(form_data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(form_data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'forget-password', requestOptions))
                .then(handleResponse)
                .then((response) => {                    
                    return response
                });
}

async function _reset_password(form_data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(form_data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'reset-password', requestOptions))
                .then(handleResponse)
                .then((response) => {                    
                    return response
                });
}

async function _check_reset(form_data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(form_data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'check-reset', requestOptions))
                .then(handleResponse)
                .then((response) => {                    
                    return response
                });
}


async function _auth_check() {
    let token = sessionStorage.getItem(token)
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'auth-check', requestOptions))
                .then(handleResponse)
                .then((data) => {
                    // if (data.token) {                
                    //     sessionStorage.setItem(token, data.token);
                    // }
                    return data;
                });
}


async function _refresh(refresh_token){

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    if(refresh_token){
        return requestTimeout(apiMaxTime,fetch(apiUrl + 'token?refresh_token='+refresh_token, requestOptions))
            .then(handleResponse)
            .then((data) => {     
                sessionStorage.setItem(token, data?.token)
                return data;
            });
    }
    return Promise.reject({error: 'Unauthorized Access'})
}

async function _resend_request(url, config){
    return requestTimeout(apiMaxTime, fetch(url, config))
            .then((data) => {  
                return data;
            });
}