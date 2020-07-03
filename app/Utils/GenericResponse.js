'use strict'

class GenericResponse {

    constructor() {

    }
    success(data, message = 'ok') {

        return {
            response: true,
            message,
            data
        };

    }

    error(error, message = "error") {
        let errorMessage = message;

        if(error.errors) {
            for (const key in error.errors) {
                errorMessage = error.errors[key].message;

                break;
            }
        }
        return {
            response: false,
            message: errorMessage,
            error,
            data: null
        }

    }
}
const genericResponse = new GenericResponse();
module.exports = genericResponse