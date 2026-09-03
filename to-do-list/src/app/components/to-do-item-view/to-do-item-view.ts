import { Component, input, output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-item-view',
  imports: [TooltipDirective],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.css',
})
export class ToDoItemView {
  readonly task = input.required<Task>();

  readonly statusChange = output<boolean>();

  onStatusChange(checked: boolean): void {
    this.statusChange.emit(checked);
  }
}
