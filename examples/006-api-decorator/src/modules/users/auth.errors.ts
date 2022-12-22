
export class ErrorResponse extends Error {
    constructor( message: string, public statusCode?: number ) {

        super(message);
    }
}

export class InvalidCredentialsError extends ErrorResponse {

    constructor(
        public message: string = "Hello world",
        public statusCode: number = 401
    ) {
        super(message);
    }

}
