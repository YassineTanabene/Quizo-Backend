import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

// roles.decorator.ts

/**
 * 2 is for manager
 * 3 is for employee
 */
export const Roles = (...args: number[]) => SetMetadata('roles', args);


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);