"use strict";
const errors = {
    LogErrorCause: (errorObject) => {
        console.log(errors.FindErrorCause(errorObject), errorObject);
    },
    FindErrorCause: (errorObject) => {
        var _a;
        if ((_a = errorObject === null || errorObject === void 0 ? void 0 : errorObject.response) === null || _a === void 0 ? void 0 : _a.status) {
            console.log("PRESUMABLY A SERVER ERROR!", typeof errorObject);
            return errors.FindServerCause(errorObject);
        }
        return "UNKNOWN ERROR!";
    },
    FindServerCause: (errorObject) => {
        if (errorObject.response.status == "503") {
            return "SERVER ERROR! STATUS CODE: 503";
        }
        return "UNKNOWN SERVER ERROR!";
    },
};
module.exports = errors;
//# sourceMappingURL=errors.js.map