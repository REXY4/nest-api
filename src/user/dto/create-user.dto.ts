import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDefined,
  Matches,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;
}
