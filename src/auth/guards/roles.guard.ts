// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from './role.enum';
// import { ROLES_KEY } from './roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// // }

// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from '../role.enum';
// import { SupabaseService } from 'supabase/supabase.service';
// import { User } from 'src/user/entities/user.entity';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private readonly supabaseService: SupabaseService,
    
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    
//     if (!roles) {
//       return true; // Si aucun rôle spécifié, autoriser l'accès
//     }
//     console.log("🚀 ~ RolesGuard ~ canActivate ~ roles:", roles)


//     const request = context.switchToHttp().getRequest();
//     const user = request.user ; // Remplacer "user" par l'objet contenant les données de l'utilisateur dans votre requête
//     console.log("🚀 ~ RolesGuard ~ canActivate ~ user:", user)

//     if (!user ) {
//       console.log("🚀 ~ Raaaa", user)
//       throw new ForbiddenException(`Non autorisé : Informations utilisateur non valides `);
//     }

//     const userRole = await this.getUserRole(user.sub);
//     console.log("🚀 ~ ok2", userRole)

//     if (!userRole) {
//       console.log("🚀 ~ RolesGuard ~ canActivate ~ userRole:", userRole)
//       throw new ForbiddenException('Non autorisé : Rôle utilisateur non trouvé');
//     }
//     return roles.some((role) => userRole.includes(role.toString())); 
// }
// async getUserRole(userId: string): Promise<string> {
//   const supabase = this.supabaseService.getClient();

//   const { data, error } = await supabase.from('profile').select('role').eq('idprofile', userId).single();
//   console.log("🚀 User Role Data:", data); // Ajouter un message pour les données retournées


//   if (error) {
//     console.error(error);
//     throw new Error('Une erreur s\'est produite lors de la récupération du rôle utilisateur');
//   }

//   if (!data || !data.role) {
//     return ''; // L'utilisateur peut ne pas avoir de profil ou de rôle
//   }

//   return data.role;
// }

// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string){
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
    const user = request.user.user_metadata;
    console.log("🚀 ~ RolesGuard ~ canActivate ~ hey:", user)

    return this.matchRoles(roles,user.role);
  }
}

