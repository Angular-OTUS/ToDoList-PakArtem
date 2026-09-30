import { Roles } from '../type/roles.type';

export interface TaskMember {
  userId: number | null;
  role: Roles | null;
}
