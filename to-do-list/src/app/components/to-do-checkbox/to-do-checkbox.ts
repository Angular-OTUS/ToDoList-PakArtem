import { Component, input, output } from '@angular/core';

@Component({
  selector: 'checkbox[app-checkbox]',
  template: `<ng-content />`,
  host: {
    '(click)': 'toggle($event)',
  },
})
export class ToDoCheckbox {
  checked = input(false);
  disabled = input(false);

  checkedChange = output<boolean>();

  toggle(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.checkedChange.emit(!this.checked());
  }
}
