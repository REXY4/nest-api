import { HttpStatus, Injectable, Logger,   } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";


@Injectable()
export class ResSuccess {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost, 
        ) {}

  sendError(message : string){
    const statusCode = HttpStatus.BAD_REQUEST;
    const body = {
      statusCode,
      status: "FAILED",
      message,
      timestamp: new Date().toISOString(),
    };
    Logger.log({
       message : `response ${statusCode} ${message}`, 
       response : body
    });
    return body;
  }      
  send(message: string, data: any) {
    const statusCode = HttpStatus.CREATED;
    const body = {
      statusCode,
      status: "success",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    Logger.log({
       message : `response ${statusCode} ${message}`, 
       response : body
    });
    return body;
  }
}
