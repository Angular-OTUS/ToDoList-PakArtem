import { Component, input, output } from '@angular/core';
import { ToDoButton } from '../to-do-button/to-do-button';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'app-to-do-item',
  imports: [ToDoButton, TooltipDirective],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
})
export class ToDoItem {
  text = input.required<string>();
  delete = output<void>();
  isSelected = input<boolean>(false);
}
