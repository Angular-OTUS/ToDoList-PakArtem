import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../interfaces/task.interface';
import { TodoStatus } from '../type/todo-status.type';
import { finalize, forkJoin } from 'rxjs';

@Service()
export class TodoService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/tasks';

  private readonly tasksSignal = signal<Task[]>([]);
  readonly isLoading = signal(false);

  readonly tasks = this.tasksSignal.asReadonly();

  getTasks() {
    this.isLoading.set(true);

    this.http
      .get<Task[]>(this.apiUrl)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (tasks) => {
          this.tasksSignal.set(tasks);
        },
        error: (error) => {
          console.error('Ошибка получения задач:', error);
        },
      });
  }

  addTask(text: string, description: string) {
    const tasks = this.tasksSignal();

    const maxOrder = tasks.length ? Math.max(...tasks.map((task) => task.order)) : -1;

    const newTask: Omit<Task, 'id'> = {
      text,
      description,
      status: 'ToDo',
      order: maxOrder + 1,
    };

    this.http.post<Task>(this.apiUrl, newTask).subscribe({
      next: (task) => {
        this.tasksSignal.update((tasks) => [...tasks, task]);
      },
      error: (error) => {
        console.error('Ошибка добавления задачи:', error);
      },
    });
  }

  editTask(id: number, text: string) {
    this.http.patch<Task>(`${this.apiUrl}/${id}`, { text }).subscribe({
      next: (updatedTask) => {
        this.tasksSignal.update((tasks) =>
          tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        );
      },
      error: (error) => {
        console.error('Ошибка изменения задачи:', error);
      },
    });
  }

  deleteTask(id: number) {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.tasksSignal.update((tasks) => tasks.filter((task) => task.id !== id));
      },
      error: (error) => {
        console.error('Ошибка удаления задачи:', error);
      },
    });
  }

  changeStatus(id: number, status: TodoStatus) {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status });
  }

  changeTaskOrder(tasks: Pick<Task, 'id' | 'order'>[]) {
    return forkJoin(
      tasks.map((task) =>
        this.http.patch(`${this.apiUrl}/${task.id}`, {
          order: task.order,
        }),
      ),
    );
  }

  reloadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.tasksSignal.set(tasks);
    });
  }
}
