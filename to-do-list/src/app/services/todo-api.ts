import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';
import { TodoStatus } from '../type/todo-status.type';

@Service()
export class TodoApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  editTask(id: number, text: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { text });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  changeTaskStatus(id: number, status: TodoStatus): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status });
  }

  changeTaskOrder(id: number, order: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { order });
  }
}
