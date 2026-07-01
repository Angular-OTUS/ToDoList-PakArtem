import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-to-do-button',
  templateUrl: './to-do-button.html',
  styleUrl: './to-do-button.css',
})
export class ToDoButtonComponent {
  inputTitle = input<string>();
  disabled = input<boolean>(false);
  clickBtn = output<void>();
}
