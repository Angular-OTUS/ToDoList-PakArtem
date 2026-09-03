import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToDoHeader } from '../to-do-header/to-do-header';
import { FormsModule } from '@angular/forms';
import { ToDoItem } from '../to-do-item/to-do-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TooltipDirective } from '../../directives/tooltip';
import { TodoService } from '../../services/todo';
import { ToastService } from '../../services/toast';
import { MatSelectModule } from '@angular/material/select';
import { Status } from '../../interfaces/status.interface';
import { TodoStatus } from '../../type/todo-status.type';
import { ToDoCreateItem } from '../to-do-create-item/to-do-create-item';
import { ToDoSpinner } from '../to-do-spinner/to-do-spinner';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoHeader,
    FormsModule,
    ToDoItem,
    MatInputModule,
    MatProgressSpinnerModule,
    TooltipDirective,
    MatSelectModule,
    ToDoCreateItem,
    ToDoSpinner,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly toastService = inject(ToastService);

  selectedStatus = signal<TodoStatus | null>(null);

  statuses: Status[] = [
    { value: null, viewValue: 'ALL' },
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
    this.todoService.changeStatus(id, status);
  }
}
