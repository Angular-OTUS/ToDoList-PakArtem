import { Service, signal } from "@angular/core";
import { Task } from "../interfaces/task.interface";

@Service()
export class TodoService  {
  selectedItemId = signal<number | null>(null);

  tasks = signal<Task[]>([
    { id: 1, text: 'Task 1', description: 'description 1' },
    { id: 2, text: 'Task 2', description: 'description 2' },
  ]);

  addTask(text: string, description:string) {
    const currentTasks = this.tasks();
    const maxId = Math.max(...currentTasks.map((task) => task.id), 0);
    const id = maxId + 1;
    this.tasks.update((tasks) => [...tasks, { id, text, description }]);
  }

  editTask(id: number, text: string) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, text }
          : task,
      ),
    );
  }

  deleteTask(idDelete: number) {
    this.tasks.update((tasks) => tasks.filter(({ id }) => id !== idDelete));
    this.selectedItemId.set(null);
  }

  getTasks() {
    return this.tasks;
  }
}
