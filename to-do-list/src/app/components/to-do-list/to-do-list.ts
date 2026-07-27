import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToDoHeader } from '../to-do-header/to-do-header';
import { FormsModule } from '@angular/forms';
import { ToDoItem } from '../to-do-item/to-do-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToDoButton } from '../to-do-button/to-do-button';
import { TooltipDirective } from '../../directives/tooltip';
import { TodoService } from '../../services/todo';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoHeader,
    FormsModule,
    ToDoItem,
    MatInputModule,
    MatProgressSpinnerModule,
    ToDoButton,
    TooltipDirective,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit {
  todoService = inject(TodoService );

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
    this.todoService.addTask(this.inputValue(), this.textareaValue());
    this.inputValue.set('');
    this.textareaValue.set('');
  }
}
