import {
  Headers,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './jwt-payload.interface';
import { User } from './dto/user.entitiy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  // // Kayıt olma.
  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.userRepository.createUser(authCredentialsDto);
  // }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayLoad = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }

  async getAdmin(@Headers('Authorization') authorization = ''): Promise<User> {
    let bearer: string = '';
    if (typeof authorization != 'undefined' && authorization) {
      bearer = authorization.replace('Bearer ', '');
      var decodedJwtAccessToken = this.jwtService.decode(bearer);
      const user = decodedJwtAccessToken['username'];
      return user;
    }
    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }
  }
}
