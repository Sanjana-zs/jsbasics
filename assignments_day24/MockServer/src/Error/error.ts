class AxiosError extends Error {
    status: number;
    constructor(msg: string, status: number) {
        super(msg);
        this.status = status;
    }
}

export { AxiosError };