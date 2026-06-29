import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
})
export class ToDoItem {
  text = input.required<string>();
  delete = output<void>();
}
