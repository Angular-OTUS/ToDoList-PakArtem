import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToastService } from '../../services/toast';
import { TodoStatus } from '../../type/todo-status.type';
import { Status } from '../../interfaces/status.interface';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ToDoItem } from '../../components/to-do-item/to-do-item';
import { ToDoCreateItem } from '../../components/to-do-create-item/to-do-create-item';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../../services/todo-store';
import { take } from 'rxjs';

@Component({
  selector: 'app-backlog',
  imports: [
    RouterLink,
    ToDoItem,
    RouterOutlet,
    ToDoCreateItem,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    RouterLinkActive,
  ],
  templateUrl: './backlog.html',
  styleUrl: './backlog.css',
})
export class Backlog implements OnInit {
  private readonly todoStore = inject(TodoStore);
  private readonly toastService = inject(ToastService);

  selectedStatus = signal<TodoStatus | null>(null);

  statuses: Status[] = [
    { value: null, viewValue: 'ALL' },
    { value: 'ToDo', viewValue: 'ToDo' },
    { value: 'InProgress', viewValue: 'In Progress' },
    { value: 'Completed', viewValue: 'Completed' },
  ];

  tasks = this.todoStore.tasks;
  isLoading = this.todoStore.isLoading;

  ngOnInit() {
    this.todoStore
      .getTasks()
      .pipe(take(1))
      .subscribe({
        next: () => this.toastService.showToast('Задачи успешно загружены!'),
        error: () => this.toastService.showToast('Не удалось загрузить задачи!'),
      });
  }

  filteredTasks = computed(() => {
    const status = this.selectedStatus();

    if (status === null) {
      return this.tasks();
    }

    return this.tasks().filter((task) => task.status === status);
  });

  deleteTask(id: number) {
    this.todoStore
      .deleteTask(id)
      .pipe(take(1))
      .subscribe({
        next: () => this.toastService.showToast('Задача удалена!'),
        error: () => this.toastService.showToast('Ошибка удаления'),
      });
  }

  changeStatus(id: number, status: TodoStatus) {
    this.todoStore
      .changeTaskStatus(id, status)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.showToast('Статус изменён!');
          this.toastService.showToast(
            status === 'Completed' ? 'Задача выполнена!' : 'Задача возвращена в работу!',
          );
        },
        error: () => {
          this.todoStore.reloadTasks().subscribe();
          this.toastService.showToast('Ошибка изменения статуса!');
        },
      });
  }
}
