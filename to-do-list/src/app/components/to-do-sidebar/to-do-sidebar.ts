import { Component } from '@angular/core';
import { ToDoHeader } from '../to-do-header/to-do-header';
import { ToDoNavigation } from '../to-do-navigation/to-do-navigation';

@Component({
  selector: 'app-to-do-sidebar',
  imports: [ToDoHeader, ToDoNavigation],
  templateUrl: './to-do-sidebar.html',
  styleUrl: './to-do-sidebar.css',
})
export class ToDoSidebar {}
