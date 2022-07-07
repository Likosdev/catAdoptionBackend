
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { decode } from 'punycode';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from './users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private userService: UsersService,
    private jwtService: JwtService
    ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request);
    
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const decoded =  this.jwtService.decode(jwt);
    console.log(decoded['_id'])
    const user = await  this.userService.findUserById(decoded['_id'])
    console.log(user)
    return requiredRoles.some(role => user.roles.includes(role));
    
  }
}