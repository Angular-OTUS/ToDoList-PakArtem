import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-to-do-button',
  templateUrl: './to-do-button.html',
  styleUrl: './to-do-button.css',
})
export class ToDoButton {
  inputTitle = input.required<string>();
  disabled = input<boolean>(false);
  variant = input<'add' | 'delete'>('add');
  clickBtn = output<void>();

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.clickBtn.emit();
  }
}
