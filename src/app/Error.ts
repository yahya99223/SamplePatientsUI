export interface Error {
    key: string;
    value: string;
}

export interface ErrorResponse {
    correlationId: string;
    errors: Error[];
}
