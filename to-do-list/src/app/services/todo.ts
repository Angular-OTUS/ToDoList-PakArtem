import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../interfaces/task.interface';
import { TodoStatus } from '../type/todo-status.type';
import { finalize } from 'rxjs';

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
    const newTask: Omit<Task, 'id'> = {
      text,
      description,
      status: 'InProgress',
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
    this.http.patch<Task>(`${this.apiUrl}/${id}`, { status }).subscribe({
      next: (updatedTask) => {
        this.tasksSignal.update((tasks) =>
          tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        );
      },
      error: (error) => {
        console.error('Ошибка изменения статуса:', error);
      },
    });
  }
}
