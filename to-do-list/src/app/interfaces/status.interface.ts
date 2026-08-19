import { TodoStatus } from '../type/todo-status.type';

export interface Status {
  value: TodoStatus | null;
  viewValue: string;
}
