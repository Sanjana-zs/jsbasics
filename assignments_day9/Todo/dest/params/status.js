"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppropriateStatus = exports.Status = void 0;
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["INCOMPLETE"] = "INCOMPLETE";
    Status["COMPlETE"] = "COMPLETE";
    Status["WRONG"] = "WRONG";
})(Status = exports.Status || (exports.Status = {}));
;
function getAppropriateStatus(status) {
    if (status.match(/pending/ig)) {
        return Status.PENDING;
    }
    if (status.match(/incomplete/ig)) {
        return Status.INCOMPLETE;
    }
    if (status.match(/complete/ig)) {
        return Status.COMPlETE;
    }
    return Status.WRONG;
}
exports.getAppropriateStatus = getAppropriateStatus;
