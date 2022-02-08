import { FormularyConstants as Constants } from '../types'
import { formularyApi as api } from '../../api'

export const formularyAction = {
  get
};

function get(token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._get(token)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {

                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.GET, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

