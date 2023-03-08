import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResSuccess } from 'src/exception/response';
import { Response } from '@nestjs/common';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private  response : ResSuccess) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    const findUserByEmail = await this.userService.findByEmail({email : createUserDto.email});
    const findUserByUsername = await this.userService.findByEmail({username : createUserDto.username});
    if(findUserByEmail || findUserByUsername){
      return this.response.sendError("User Already Exist")
    }
    const result = await this.userService.create(createUserDto);
    return this.response.send("Create user success", result);
  }

  @Get()
  async findAll() {
    const findAll = await this.userService.findAll();
    return this.response.send("get all users", findAll);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
