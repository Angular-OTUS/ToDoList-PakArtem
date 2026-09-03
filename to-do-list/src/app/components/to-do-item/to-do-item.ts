import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip';
import { MatInputModule } from '@angular/material/input';
import { TodoService } from '../../services/todo';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { TodoStatus } from '../../type/todo-status.type';
import { ToDoButton } from '../to-do-button/to-do-button';

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
  private readonly todoService = inject(TodoService);
  private readonly toastService = inject(ToastService);

  id = input.required<number>();
  text = input.required<string>();
  status = input<TodoStatus | null>('InProgress');

  inputValue = signal('');
  isEdit = signal<boolean>(false);

  delete = output<void>();
  statusChange = output<TodoStatus>();

  constructor() {
    effect(() => {
      this.inputValue.set(this.text());
    });
  }

  isInputEmpty = computed(() => {
    return this.inputValue().trim().length === 0;
  });

  onClick(): void {
    this.todoService.editTask(this.id(), this.inputValue());
    this.isEdit.set(false);
    this.toastService.showToast('Задача изменена!');
  }

  onStatusChange(checked: boolean): void {
    const newStatus: TodoStatus = checked ? 'Completed' : 'InProgress';

    this.statusChange.emit(newStatus);

    this.toastService.showToast(
      newStatus === 'Completed' ? 'Задача выполнена!' : 'Задача возвращена в работу!',
    );
  }

  deleteTask(event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit();
  }
}
