import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { LogDto } from "./log.dto";

@Controller("logging")
export class LoggingController {
    @Post()
    async createLog(@Body("log") log: LogDto) {
        try {
            console.log(log.toString());
        } catch (err) {
            return new HttpException("Failed to add log!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
