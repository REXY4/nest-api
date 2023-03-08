import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository : Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    let newUser = new User(); 
    Object.keys(createUserDto).forEach((key) => {
      newUser[key] = createUserDto[key];
    });
    const saltRound = 10;
    const passwordHash =  bcrypt.hashSync(createUserDto.password, saltRound); 
    newUser.password = passwordHash;
    const createUser = this.usersRepository.create(newUser);
    return this.usersRepository.save(createUser);
  }

  update(id : number,UpdateUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(option : any): Promise<User> {
    return this.usersRepository.findOneBy(option);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
