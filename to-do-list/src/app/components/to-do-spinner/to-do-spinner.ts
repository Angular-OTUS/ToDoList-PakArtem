import { Component, input } from '@angular/core';

@Component({
  selector: 'app-to-do-spinner',
  imports: [],
  templateUrl: './to-do-spinner.html',
  styleUrl: './to-do-spinner.css',
})
export class ToDoSpinner {
  size = input<number>(40);
}
 