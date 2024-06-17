import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entitys/auth.entity';
import { md5 } from 'src/utils/md5';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  
  @InjectRepository(Auth)
  private authRepository: Repository<Auth>; 
  
  /**
   * User register
   * @param createAuthDto 
   */
  async register(createAuthDto: CreateAuthDto) {
    // if user already exists
    const user = await this.authRepository.findOne(
      {
        where: {
          username: createAuthDto.username
        }
      }
    );
    if(user){
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // create user
    const newUser = new Auth();
    newUser.username = createAuthDto.username;
    // md5 encryption
    newUser.password = md5(createAuthDto.password);
    newUser.email = createAuthDto.email;
    await this.authRepository.save(newUser);

    return 'User created successfully';
  }


  async login(user: LoginDto) {
    const findUser = await this.authRepository.findOne(
      {
        where: {
          username: user.username,
        }
      }
    );

    // if user does not exist
    if(!findUser){
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    // verify password
    if(findUser.password !== md5(user.password)){
      throw new HttpException('Password error', HttpStatus.BAD_REQUEST);
    }

    return findUser;
  }
}
