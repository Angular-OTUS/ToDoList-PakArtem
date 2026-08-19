import { TodoStatus } from '../type/todo-status.type';

export interface Task {
  id: number;
  text: string;
  description: string;
  status: TodoStatus | null;
}
