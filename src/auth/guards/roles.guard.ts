import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string){
    console.log("🚀 ~ RolesGuard ~ matchRoles ~ roles:", roles)
    console.log("🚀 ~ RolesGuard ~ matchRoles ~ userRole:", userRole)
    return roles.some((role)=>role === userRole);
  }
  
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // If no roles are specified, access is allowed
    if (!roles) {
      return false;
    }
    console.log("🚀 ~ RolesGuard ~ canActivate ~ roles:", roles)

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user data is attached to the request

    if (!user) {
      // Handle case where user data is not available
      return false;
    }

    const userRole = user?.user_metadata?.role; // Check for nullability before accessing properties

    console.log("🚀 ~ RolesGuard ~ canActivate ~ hey:", userRole)

    return this.matchRoles(roles, userRole);
  }
}
