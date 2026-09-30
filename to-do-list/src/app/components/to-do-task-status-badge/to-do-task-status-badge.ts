import { Component, input } from '@angular/core';

@Component({
  selector: 'app-to-do-task-status-badge',
  imports: [],
  templateUrl: './to-do-task-status-badge.html',
  styleUrl: './to-do-task-status-badge.css',
  host: {
    '[class.status--todo]': 'status() === "ToDo"',
    '[class.status--in-progress]': 'status() === "InProgress"',
    '[class.status--completed]': 'status() === "Completed"',
  },
})
export class ToDoTaskStatusBadge {
  status = input<string | null>('');
}
