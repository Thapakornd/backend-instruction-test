import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Observable} from 'rxjs';
import {IsPublic} from '../decorator/public-route.decorator';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflectorPublic: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflectorPublic.get(IsPublic, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
  }
}
