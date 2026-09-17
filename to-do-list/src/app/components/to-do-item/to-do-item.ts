import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { TodoStatus } from '../../type/todo-status.type';
import { ToDoButton } from '../to-do-button/to-do-button';
import { TodoStore } from '../../services/todo-store';
import { take } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[appToDoItem]',
  imports: [TooltipDirective, MatInputModule, FormsModule, ToDoButton],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
  host: {
    class: 'task',
    '(dblclick)': 'isEdit.set(true)',
  },
})
export class ToDoItem {
  private readonly todoStore = inject(TodoStore);
  private readonly toastService = inject(ToastService);

  task = input.required<Task>();
  isCompleted = signal<boolean>(false);
  inputValue = signal('');
  isEdit = signal<boolean>(false);

  delete = output<void>();
  statusChange = output<TodoStatus>();

  constructor() {
    effect(() => {
      const task = this.task();

      this.inputValue.set(task.text);
      this.isCompleted.set(task.status === 'Completed');
    });
  }

  isInputEmpty = computed(() => {
    return this.inputValue().trim().length === 0;
  });

  onClick(): void {
    this.todoStore
      .editTask(this.task().id, this.inputValue())
      .pipe(take(1))
      .subscribe({
        next: () => this.toastService.showToast('Задача изменена!'),
        error: () => this.toastService.showToast('Ошибка изменения задачи!'),
      });
    this.isEdit.set(false);
  }

  onStatusChange(checked: boolean): void {
    const newStatus: TodoStatus = checked ? 'Completed' : 'InProgress';

    this.statusChange.emit(newStatus);
  }

  deleteTask(event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit();
  }
}
