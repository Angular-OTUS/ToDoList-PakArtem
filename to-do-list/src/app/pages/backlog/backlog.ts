import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToastService } from '../../services/toast';
import { TodoService } from '../../services/todo';
import { TodoStatus } from '../../type/todo-status.type';
import { Status } from '../../interfaces/status.interface';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ToDoItem } from '../../components/to-do-item/to-do-item';
import { ToDoCreateItem } from '../../components/to-do-create-item/to-do-create-item';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

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
  private readonly todoService = inject(TodoService);
  private readonly toastService = inject(ToastService);

  selectedStatus = signal<TodoStatus | null>(null);

  statuses: Status[] = [
    { value: null, viewValue: 'ALL' },
    { value: 'ToDo', viewValue: 'ToDo' },
    { value: 'InProgress', viewValue: 'In Progress' },
    { value: 'Completed', viewValue: 'Completed' },
  ];

  tasks = this.todoService.tasks;
  isLoading = this.todoService.isLoading;

  ngOnInit() {
    this.todoService.getTasks();
  }

  filteredTasks = computed(() => {
    const status = this.selectedStatus();

    if (status === null) {
      return this.tasks();
    }

    return this.tasks().filter((task) => task.status === status);
  });

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
    this.toastService.showToast('Задача удалена!');
  }

  changeStatus(id: number, status: TodoStatus) {
    this.todoService.changeStatus(id, status).subscribe({
      error: () => this.todoService.reloadTasks(),
    });
  }
}
