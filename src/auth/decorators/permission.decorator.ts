import { SetMetadata } from '@nestjs/common';

export const PERMISSION_NAME_KEY = 'permissionName';

export const Permission = (...permissionName: string[]) =>
  SetMetadata(PERMISSION_NAME_KEY, permissionName);
