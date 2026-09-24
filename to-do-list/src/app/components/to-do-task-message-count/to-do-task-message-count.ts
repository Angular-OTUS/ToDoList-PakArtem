import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-to-do-task-message-count',
  imports: [MatIconModule],
  templateUrl: './to-do-task-message-count.html',
  styleUrl: './to-do-task-message-count.css',
})
export class ToDoTaskMessageCount {
  count = input(0);
}
