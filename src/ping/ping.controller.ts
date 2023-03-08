import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { PingService } from './ping.service';
import {Response} from "express";


@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}
  @Get()
  checkAll(@Res() res : Response ) {
    const result = this.pingService.findAll();
    res.status(HttpStatus.CREATED).send({
      statusCode : 200,
      message : "Ping:Ok",
      data : result
    })
  }
}
