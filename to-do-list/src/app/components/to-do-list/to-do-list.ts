import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToDoHeader } from '../to-do-header/to-do-header';
import { FormsModule } from '@angular/forms';
import { ToDoItem } from '../to-do-item/to-do-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TooltipDirective } from '../../directives/tooltip';
import { TodoService } from '../../services/todo';
import { ToDoButton } from '../../directives/to-do-button';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoHeader,
    FormsModule,
    ToDoItem,
    MatInputModule,
    MatProgressSpinnerModule,
    TooltipDirective,
    ToDoButton,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit {
  todoService = inject(TodoService);

  isLoading = signal<boolean>(true);
  inputValue = signal('');
  textareaValue = signal('');
  selectedItemId = this.todoService.selectedItemId;

  tasks = this.todoService.getTasks();

  selectedDescriptionTask = computed(() => {
    const selectedId = this.selectedItemId();
    if (selectedId === null) return;

    const task = this.tasks().find(task => task.id === selectedId);
    return task ? task.description : 'Задача не найдена';
  });

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  isInputEmpty = computed(() => {
    return this.inputValue().trim().length === 0;
  });

  addTask() {
    this.todoService.addTask(this.inputValue().trim(), this.textareaValue().trim());
    this.inputValue.set('');
    this.textareaValue.set('');
  }
}
