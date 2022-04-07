export enum reqMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

export enum Status {
    PENDING = 'PENDING',
    INCOMPLETE = 'INCOMPLETE',
    COMPlETE = 'COMPLETE',
    WRONG = 'WRONG'
};

export function getAppropriateStatus(status:string) {
    if(status.match(/pending/ig)) {
        return Status.PENDING;
    }
    if(status.match(/incomplete/ig)) {
        return Status.INCOMPLETE;
    }
    if(status.match(/complete/ig)) {
        return Status.COMPlETE;
    }
    return Status.WRONG;
}