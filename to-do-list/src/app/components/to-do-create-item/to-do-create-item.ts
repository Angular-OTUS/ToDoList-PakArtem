import { Component, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';

import { TodoStore } from '../../services/todo-store';
import { ToastService } from '../../services/toast';

import { TooltipDirective } from '../../directives/tooltip';
import { ToDoButton } from '../to-do-button/to-do-button';
import { take } from 'rxjs';

@Component({
  selector: 'app-to-do-create-item',
  imports: [FormsModule, MatInputModule, TextFieldModule, TooltipDirective, ToDoButton],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.css',
})
export class ToDoCreateItem {
  private readonly todoStore = inject(TodoStore);
  private readonly toastService = inject(ToastService);

  model = {
    title: '',
    description: '',
  };

  todoForm = viewChild<NgForm>('todoForm');

  addTask() {
    const title = (this.model.title || '').trim();
    const description = (this.model.description || '').trim();

    this.todoStore
      .addTask(title, description)
      .pipe(take(1))
      .subscribe({
        next: () => this.toastService.showToast($localize`:@@taskAdded:Task added!`),
        error: () => this.toastService.showToast($localize`:@@taskAddError:Failed to add task!`),
        complete: () => this.todoForm()?.resetForm(),
      });
  }
}
