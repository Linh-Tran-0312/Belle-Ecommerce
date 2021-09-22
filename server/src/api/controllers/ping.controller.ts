import { Get, Route, Tags } from "tsoa";

interface PingMessage {
    message: string,
}
@Route("ping")
@Tags('Ping Controller')
export class PingController {
    @Get("/")
    public async getMessage(): Promise<PingMessage> {
        return {
            message: "pong"
        }
    }
}