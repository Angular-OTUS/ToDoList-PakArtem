import { Component, computed, OnInit, signal } from '@angular/core';
import { ToDoHeader } from '../to-do-header/to-do-header';
import { FormsModule } from '@angular/forms';
import { ToDoItem } from '../to-do-item/to-do-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToDoButton } from '../to-do-button/to-do-button';
import { TooltipDirective } from '../../directives/tooltip';
import { Task } from '../../interfaces/task.interface';

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
  isLoading = signal<boolean>(true);
  inputValue = signal('');
  textareaValue = signal('');
  selectedItemId = signal<number | null>(null);

  tasks = signal<Task[]>([
    { id: 1, text: 'Task 1', description: 'description 1' },
    { id: 2, text: 'Task 2', description: 'description 2' },
  ]);

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

  deleteTask(idDelete: number) {
    this.tasks.update((tasks) => tasks.filter(({ id }) => id !== idDelete));
    this.selectedItemId.set(null);
  }

  addTask() {
    const currentTasks = this.tasks();
    const maxId = Math.max(...currentTasks.map((task) => task.id), 0);
    const id = maxId + 1;
    const text = this.inputValue().trim();
    const description = this.textareaValue().trim();
    this.tasks.update((tasks) => [...tasks, { id, text, description }]);
    this.inputValue.set('');
    this.textareaValue.set('');
  }
}
