import { Component, input } from '@angular/core';

@Component({
  selector: 'app-to-do-error-state',
  imports: [],
  templateUrl: './to-do-error-state.html',
  styleUrl: './to-do-error-state.css',
})
export class ToDoErrorState {
  readonly textError = input<string>('что то пошло не так!😔');
}
