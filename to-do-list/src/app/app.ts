import { Component, signal } from '@angular/core';
import { ToDoList } from './components/to-do-list/to-do-list';
import { ToDoToast } from './components/to-do-toast/to-do-toast';

@Component({
  selector: 'app-root',
  imports: [ToDoList, ToDoToast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('to-do-list');
}
