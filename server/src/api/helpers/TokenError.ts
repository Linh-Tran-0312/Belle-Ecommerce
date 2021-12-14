export class TokenError extends Error {
    public role: string ;

    constructor(message: string, role: string = "") {
        super(message)
        this.role = role;
    }
}