import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-to-do-button',
  templateUrl: './to-do-button.html',
  styleUrl: './to-do-button.css',
})
export class ToDoButton {
  inputTitle = input<string>();
  disabled = input<boolean>(false);
  variant = input<'add' | 'delete'>('add');
  clickBtn = output<void>();

  buttonClass = computed(() => ({
    'btn--add': this.variant() === 'add',
    'btn--delete': this.variant() === 'delete',
  }));
}
