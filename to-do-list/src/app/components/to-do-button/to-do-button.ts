import { Component, inject, input, output } from '@angular/core';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-to-do-button',
  templateUrl: './to-do-button.html',
  styleUrl: './to-do-button.css',
})
export class ToDoButton {
  toastService = inject(ToastService);

  inputTitle = input.required<string>();
  disabled = input<boolean>(false);
  textToast = input<string>('');
  variant = input<'add' | 'delete'>('add');

  clickBtn = output<void>();

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.clickBtn.emit();

    const text = this.textToast().trim();

    if (text) {
      this.toastService.showToast(text);
    }
  }
}
