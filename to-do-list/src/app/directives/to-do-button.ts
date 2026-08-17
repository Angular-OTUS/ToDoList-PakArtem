import { Directive, ElementRef, inject, input, output } from '@angular/core';

@Directive({
  selector: '[appToDoButton]',
  host: {
    '(click)': 'onClick()',
    '[class.btn--add]': 'variant() === "add"',
    '[class.btn--delete]': 'variant() === "delete"',
  },
})
export class ToDoButton {
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);
  readonly variant = input<'add' | 'delete'>('add');

  readonly clicked = output<void>();

  onClick(): void {
    if (this.elementRef.nativeElement.disabled) {
      return;
    }

    this.clicked.emit();
  }
}
