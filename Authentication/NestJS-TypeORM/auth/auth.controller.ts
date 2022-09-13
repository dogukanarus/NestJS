import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Post,
  Req,
  Request,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './dto/user.entitiy';
import { JwtPayLoad } from './jwt-payload.interface';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // // Kayıt olma.
  // @Post('/signup')
  // @FormDataRequest()
  // @ApiBody({ type: AuthCredentialsDto })
  // singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }
  @Post('/signin')
  @FormDataRequest()
  @ApiBody({ type: AuthCredentialsDto })
  singIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
  @Get('/admin')
  getAdmin(@Headers('Authorization') authorization = ''): Promise<User> {
    return this.authService.getAdmin(authorization);
  }
}
