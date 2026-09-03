import { Component, signal } from '@angular/core';
import { ToDoToast } from './components/to-do-toast/to-do-toast';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ToDoToast, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('to-do-list');
}
