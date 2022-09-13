import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './dto/user.entitiy';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // // Kayıt olma.
  // async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   const { username, password } = authCredentialsDto;
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const user = this.create({
  //     username,
  //     password: hashedPassword,
  //   });
  //   try {
  //     await this.save(user);
  //   } catch (error) {
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       throw new ConflictException('Bu kullanıcı adı daha önce alınmış.');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
}
