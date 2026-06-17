import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-to-do-list-item-component',
  imports: [],
  templateUrl: './to-do-list-item-component.html',
  styleUrl: './to-do-list-item-component.css',
})
export class ToDoListItemComponent {
  text = input.required<string>();
  id = input.required<number>();
  delete = output<number>();

  deleteTask() {
    this.delete.emit(this.id());
  }
}
