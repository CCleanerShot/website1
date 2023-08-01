import { errorMonitor } from "events";

interface ErrorHandler {
    LogErrorCause(errorObject: any): any;
    FindErrorCause(errorObject: any): any;
    FindServerCause(errorObject: any): any;
}

const errors: ErrorHandler = {
    LogErrorCause: (errorObject: any): any => {
        console.log(errors.FindErrorCause(errorObject), errorObject);
    },

    FindErrorCause: (errorObject: any): any => {
        if(errorObject?.response?.status) {
            console.log("PRESUMABLY A SERVER ERROR!", typeof errorObject);
            return errors.FindServerCause(errorObject);
        }

        return "UNKNOWN ERROR!";
    },

    FindServerCause: (errorObject: any): any => {
        if(errorObject.response.status == "503") {
            return "SERVER ERROR! STATUS CODE: 503";
        }

        return "UNKNOWN SERVER ERROR!"
    },

}

export = errors