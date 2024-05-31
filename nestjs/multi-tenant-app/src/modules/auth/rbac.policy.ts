import { UserRole } from "src/entities/enum/user-role.enum";

export enum Resource {
    USER = 'USER',
    PRODUCT = 'PRODUCT',
  }
  
  export enum Action {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
  }
  
  export const policies = {
    [UserRole.ADMIN]: {
      [Resource.USER]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
      [Resource.PRODUCT]: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
    },
    [UserRole.MODERATOR]: {
      [Resource.USER]: [Action.READ],
      [Resource.PRODUCT]: [Action.READ, Action.UPDATE],
    },
    [UserRole.EMPLOYEE]: {
      [Resource.USER]: [Action.READ],
      [Resource.PRODUCT]: [Action.CREATE, Action.READ],
    },
    [UserRole.CUSTOMER]: {
      [Resource.USER]: [Action.READ],
      [Resource.PRODUCT]: [Action.READ],
    },
  };
  
  export const canPerformAction = (
    role: UserRole,
    resource: Resource,
    action: Action,
  ): boolean => {
    const allowedActions = policies[role][resource] || [];
    return allowedActions.includes(action);
  };