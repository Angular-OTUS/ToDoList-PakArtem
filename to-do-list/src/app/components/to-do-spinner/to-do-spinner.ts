import { Component, input } from '@angular/core';

@Component({
  selector: 'app-to-do-spinner',
  imports: [],
  templateUrl: './to-do-spinner.html',
  styleUrl: './to-do-spinner.css',
  host: {
    class: 'spinner',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
})
export class ToDoSpinner {
  size = input<number>(40);
}
