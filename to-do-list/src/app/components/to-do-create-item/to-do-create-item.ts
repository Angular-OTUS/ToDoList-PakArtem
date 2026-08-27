import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';

import { TodoService } from '../../services/todo';
import { ToastService } from '../../services/toast';
import { ToDoButton } from '../../directives/to-do-button';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-create-item',
  imports: [FormsModule, MatInputModule, TextFieldModule, ToDoButton, TooltipDirective],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.css',
})
export class ToDoCreateItem {
  todoService = inject(TodoService);
  toastService = inject(ToastService);

  model = {
    title: '',
    description: '',
  };

  @ViewChild('todoForm') todoForm!: NgForm;

  addTask() {
    const title = (this.model.title || '').trim();
    const description = (this.model.description || '').trim();

    this.todoService.addTask(title.trim(), description.trim());

    this.todoForm.resetForm();

    this.toastService.showToast('Добавлена задача!');
  }
}
