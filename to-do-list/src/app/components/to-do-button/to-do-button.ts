import { Component, ElementRef, inject, input, output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-button]',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick()',
    '[class.btn--add]': 'variant() === "add"',
    '[class.btn--delete]': 'variant() === "delete"',
    '[class.btn--active]': 'variant() === "active"',
  },
})
export class ToDoButton {
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);
  readonly variant = input<'add' | 'delete' | 'active'>('add');

  readonly clicked = output<void>();

  onClick(): void {
    if (this.elementRef.nativeElement.disabled) {
      return;
    }

    this.clicked.emit();
  }
}
