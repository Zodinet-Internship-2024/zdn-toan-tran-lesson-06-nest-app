import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { readFileSync } from 'fs';
import * as path from 'path';
import { PERMISSION_NAME_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly roleFilePath = path.join(
    __dirname,
    '..',
    '../../src/db/roles.json',
  );
  private readonly permissionFilePath = path.join(
    __dirname,
    '..',
    '../../src/db/permission.json',
  );
  private readonly permissionRoleFilePath = path.join(
    __dirname,
    '..',
    '../../src/db/permission_role.json',
  );

  constructor(private reflector: Reflector) {}

  private async readFiles() {
    const roles = JSON.parse(readFileSync(this.roleFilePath, 'utf8'));
    const permissions = JSON.parse(
      readFileSync(this.permissionFilePath, 'utf8'),
    );
    const permissionRoles = JSON.parse(
      readFileSync(this.permissionRoleFilePath, 'utf8'),
    );

    return { roles, permissions, permissionRoles };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionNames = this.reflector.get<string>(
      PERMISSION_NAME_KEY,
      context.getHandler(),
    );

    if (!permissionNames) {
      return false;
    }

    const { roles, permissions, permissionRoles } = await this.readFiles();

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const role = roles.find((role) => role.id === user.roleId);
    const permission = permissions.find((permission) =>
      permissionNames.includes(permission.name),
    );
    console.log({ permission });
    const permissionRole = permissionRoles.find(
      (permissionRole) =>
        permissionRole.permissionId === permission.id &&
        permissionRole.roleId === role.id,
    );

    if (!permissionRole) {
      return false;
    }

    return true;
  }
}
