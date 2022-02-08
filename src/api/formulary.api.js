import { apiUrl, apiMaxTime } from '../config.json' 
import {handleResponse, requestTimeout} from './../helpers'
import {useSelector } from 'react-redux'
export const formularyApi = {
    _get,
};
async function _get(token) {    
  console.log("sdgas",token)

    let app_token = token;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'LoadAllDrugs?PageNo=1&PageSize=20&MedicineName=&RouteID=0&Formid=0&ClassificationID=0&AdHoc=0', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}


