// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // If no roles are specified, access is allowed
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const profile: Profile = request.profile;
    console.log(profile)

    if (!profile || !profile.role) {
      // No profile or role is present, access is denied
      return false;
    }

    const userRoles: string[] = Array.isArray(profile.role) ? profile.role : [profile.role.toString()];

    // Check if any of the user's roles match the required roles
    return userRoles.some(userRole => roles.includes(userRole));
  }
}
