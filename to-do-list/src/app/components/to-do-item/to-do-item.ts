import { Component } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-to-do-item',
  imports: [Button],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
})
export class ToDoItem {}
