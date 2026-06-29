import { Component, computed, signal } from "@angular/core";
import { ToDoHeader } from "../to-do-header/to-do-header";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { ToDoItem } from "../to-do-item/to-do-item";
import { MatInputModule } from "@angular/material/input";

interface Task {
  id: number;
  text: string;
}

@Component({
  selector: 'app-to-do-list',
  imports: [ToDoHeader, FormsModule, NgClass, ToDoItem, MatInputModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList {
  inputValue = signal<string>('');
  tasks = signal<Task[]>([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
  ]);

  isInputEmpty = computed(() => {
    return this.inputValue().trim().length === 0;
  });

  deleteTask(idDelete: number) {
    this.tasks.update(tasks => tasks.filter(({id}) => id !== idDelete));
  }

  addTask() {
    const currentTasks = this.tasks();
    const maxId = Math.max(...currentTasks.map(task => task.id), 0);
    const id = maxId + 1;
    const text = this.inputValue();
    this.tasks.update(tasks => [...tasks, {id, text}]);
    this.inputValue.set("");
  }
}
