import { Component, signal } from '@angular/core';
import { ToDoHeader } from './components/to-do-header/to-do-header';
import { ToDoList} from './components/to-do-list/to-do-list';
import { ToDoForm } from './components/to-do-form/to-do-form';
import { ToDoItem } from './components/to-do-item/to-do-item';
@Component({
  selector: 'app-root',
  imports: [ToDoHeader, ToDoList, ToDoForm, ToDoItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('to-do-list');
}
