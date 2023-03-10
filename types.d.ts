export const PermissionAction: {
  read: 'read';
  create: 'create';
  update: 'update';
  delete: 'delete';
};

export type PermissionAction = typeof PermissionAction[keyof typeof PermissionAction];

export const Resource: {
  roles: 'roles';
  permissions: 'permissions';
  user_accounts: 'user_accounts';
  contact_groups: 'contact_groups';
  contacts: 'contacts';
  messages: 'messages';
};

export type Resource = typeof Resource[keyof typeof Resource];

export const RoleType: {
  system_generated: 'system_generated';
  user_generated: 'user_generated';
};

export type RoleType = typeof RoleType[keyof typeof RoleType];

export const Status: {
  active: 'active';
  suspended: 'suspended';
};

export type Status = typeof Status[keyof typeof Status];

export type Permission = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string | null;
  actions: PermissionAction[];
  resource: Resource;
};

export type Role = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string | null;
  type: RoleType;
};

export type PermissionsOnRoles = {
  role_id: string;
  permission_id: string;
  assignedAt: Date;
  permissions: Permission[];
};

export type UserAccount = {
  id: string;
  created_at: Date;
  updated_at: Date;
  role_id: string;
  role: Role;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  status: Status;
};

export type ContactGroup = {
  id: string;
  created_at: Date;
  updated_at: Date;
  status: Status;
  created_by_id?: string;
  created_by?: UserAccount;
  name: string;
  description?: string;
  _count: {
    contacts: number;
  };

  contacts: ContactOnGroup[];
};

export type ContactOnGroup = {
  contact_id: string;
  contact_group_id: string;
  contact: Contact;
};

export type Contact = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  created_by_id?: string;
  created_by?: UserAccount;
  email_address: string;
  phone_number: string;
  surname: string;
  other_names: string;
};
