import { Component, input, output } from '@angular/core';
import { ToDoButton } from '../to-do-button/to-do-button';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[appToDoItem]',
  imports: [ToDoButton, TooltipDirective],
  templateUrl: './to-do-item.html',
  styleUrl: './to-do-item.css',
  host: {
    'class':'task',
    '[class.selected]': 'selectedClass',
  },
})
export class ToDoItem {
  text = input.required<string>();
  isSelected = input<boolean>(false);

  delete = output<void>();

  get selectedClass(): boolean {
    return this.isSelected();
  }
}
