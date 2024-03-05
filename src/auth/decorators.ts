// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

/**
 * 1 is for Owner
 * 2 is for Manager
 * 3 is for Employee
 */
export const Roles = (...args: number[]) => SetMetadata('roles', args);


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
