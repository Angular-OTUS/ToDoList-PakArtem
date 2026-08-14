import { inject, Service, signal } from "@angular/core";
import { Task } from "../interfaces/task.interface";
import { ToastService } from "./toast";

@Service()
export class TodoService {
  protected toastService = inject(ToastService);

  private readonly tasksSignal = signal<Task[]>([
    { id: 1, text: 'Task 1', description: 'description 1' },
    { id: 2, text: 'Task 2', description: 'description 2' },
  ]);

  private readonly selectedItemIdSignal = signal<number | null>(null);

  readonly tasks = this.tasksSignal.asReadonly();
  readonly selectedItemId = this.selectedItemIdSignal.asReadonly();

  addTask(text: string, description: string) {
    const currentTasks = this.tasksSignal();
    const maxId = Math.max(...currentTasks.map(task => task.id), 0);
    const id = maxId + 1;

    this.tasksSignal.update((tasks) => [...tasks, { id, text, description }]);
    this.toastService.showToast("Добавлена задача!");
  }

  editTask(id: number, text: string) {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, text }
          : task,
      ),
    );
    this.toastService.showToast("Задача изменена!");
  }

  deleteTask(idDelete: number) {
    this.tasksSignal.update(tasks =>tasks.filter(({ id }) => id !== idDelete));
    this.toastService.showToast("Задача удалена!");

    if (this.selectedItemIdSignal() === idDelete) {
      this.selectedItemIdSignal.set(null);
    }
  }

  getTasks() {
    return this.tasks;
  }

  selectItem(id: number | null) {
    this.selectedItemIdSignal.set(id);
  }
}
