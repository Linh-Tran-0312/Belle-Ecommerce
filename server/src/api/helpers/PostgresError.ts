import { QueryFailedError } from "typeorm";
import { PostgresErrorCode } from "./PostgresCode";
 

export class PostgresError extends Error {
    public readonly code: any;
    constructor(message: string, readonly queryError: QueryFailedError) {
        super(message);
       this.code = (queryError as unknown as { code: PostgresErrorCode }).code;
    }
}



