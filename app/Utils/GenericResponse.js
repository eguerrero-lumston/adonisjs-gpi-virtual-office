'use strict'

class GenericResponse {

    constructor() {

    }
    success(data, message = 'ok') {
        // console.log("data", data.pages)
        if(data != null && data.pages != null) {
            return {
                response: true,
                message,
                total : data.pages.total || 0,
                "perPage": data.pages.perPage || 0,
                "page": data.pages.page || 0,
                "lastPage": data.pages.lastPage || 0,
                "data": data.rows || []
            }
        }  
        return {
            response: true,
            message,
            data
        };

    }

    error(error, message = "error") {
        let errorMessage = message;

        if(error != null && error.errors) {
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