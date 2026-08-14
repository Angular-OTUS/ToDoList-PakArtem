import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip';
import { MatInputModule } from '@angular/material/input';
import { TodoService } from '../../services/todo';
import { FormsModule } from '@angular/forms';
import { ToDoButton } from '../../directives/to-do-button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[appToDoItem]',
  imports: [ToDoButton, TooltipDirective, MatInputModule, FormsModule],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
  host: {
    'class':'task',
    '[class.selected]': 'selectedClass',
    '(dblclick)': 'isEdit.set(true)',
  },
})
export class ToDoItem {
  todoService = inject(TodoService);

  id = input.required<number>();
  text = input.required<string>();
  isSelected = input<boolean>(false);

  inputValue = signal('');
  isEdit = signal<boolean>(false);

  delete = output<void>();

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
  }
}
