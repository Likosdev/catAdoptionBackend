import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user: User = await this.usersService.findUserByName(username);

    if (!user) return null;

    const isMatch: boolean = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const { ...doc } = user;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = doc['_doc'];
      return result;
    }
    return null;
  }

  async login(payload: any) {

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
