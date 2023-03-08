import { Injectable } from '@nestjs/common';


@Injectable()
export class PingService {
  findAll() {
    return `This action returns all ping`;
  }
}
