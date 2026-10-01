import { Component } from '@angular/core';
import { ToDoNavigation } from '../to-do-navigation/to-do-navigation';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-to-do-sidebar',
  imports: [ToDoNavigation, MatIconModule],
  templateUrl: './to-do-sidebar.html',
  styleUrl: './to-do-sidebar.css',
})
export class ToDoSidebar {}
