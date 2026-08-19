import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip';
import { MatInputModule } from '@angular/material/input';
import { TodoService } from '../../services/todo';
import { FormsModule } from '@angular/forms';
import { ToDoButton } from '../../directives/to-do-button';
import { ToastService } from '../../services/toast';
import { TodoStatus } from '../../type/todo-status.type';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[appToDoItem]',
  imports: [ToDoButton, TooltipDirective, MatInputModule, FormsModule],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
  host: {
    class: 'task',
    '[class.selected]': 'selectedClass',
    '(dblclick)': 'isEdit.set(true)',
  },
})
export class ToDoItem {
  todoService = inject(TodoService);
  toastService = inject(ToastService);

  id = input.required<number>();
  text = input.required<string>();
  isSelected = input<boolean>(false);
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

  get selectedClass(): boolean {
    return this.isSelected();
  }

  onClick(): void {
    this.todoService.editTask(this.id(), this.inputValue());
    this.isEdit.set(false);
    this.toastService.showToast('Задача изменена!');
  }

  onStatusChange(event: Event): void {
    event.stopPropagation();

    const checkbox = event.target as HTMLInputElement;

    const newStatus: TodoStatus = checkbox.checked ? 'Completed' : 'InProgress';

    this.statusChange.emit(newStatus);

    this.toastService.showToast(
      newStatus === 'Completed' ? 'Задача выполнена!' : 'Задача возвращена в работу!',
    );
  }
}
