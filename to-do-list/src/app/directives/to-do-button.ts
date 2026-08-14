import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[appToDoButton]',
  host: {
    '(click)': 'onClick()',
    '[class.btn--add]': 'variant() === "add"',
    '[class.btn--delete]': 'variant() === "delete"',
  },
})
export class ToDoButton {
  readonly disabled = input(false);
  readonly variant = input<'add' | 'delete'>('add');

  readonly clicked = output<void>();

  onClick(): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit();
  }
}
