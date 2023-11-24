import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('plainTextPassword') plainTextPassword: string,
  ) {
    const user = await this.authService.login(email);
    console.log(
      '🚀 ~ file: auth.controller.ts:14 ~ AuthController ~ user:',
      user,
    );
    if (!user) {
      console.log('user does not exist in data base');
      throw new UnauthorizedException();
    }
    // console.log(user);
    return new Promise((resolve, reject) => {
      // password(plainTextPassword).hash((err, hash) => {
      //   console.log(hash);
      // });
      password(plainTextPassword).verifyAgainst(
        user.passwordHash,
        (err, verified) => {
          if (!verified) {
            reject(new UnauthorizedException());
          }
          const authJwtToken = jwt.sign(
            { email, roles: user.roles },
            process.env.JWT_SECRET,
          );
          resolve({ authJwtToken });
        },
      );
    });
  }

  @Post('user')
  async createUser(
    @Body('email') email: string,
    @Body('roles') roles: string[],
    @Body('passwordHash') passwordHash: string,
  ) {
    return this.authService.createUser({ email, roles, passwordHash });
  }
}
