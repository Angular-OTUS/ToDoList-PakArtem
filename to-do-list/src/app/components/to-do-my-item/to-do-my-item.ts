import { Component, input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { ToDoTaskStatusBadge } from '../to-do-task-status-badge/to-do-task-status-badge';
import { ToDoTaskMessageCount } from '../to-do-task-message-count/to-do-task-message-count';
import { MatIcon } from '@angular/material/icon';
import { ToDoUserAvatar } from '../to-do-user-avatar/to-do-user-avatar';

@Component({
  selector: 'li[appToDoMyItem]',
  imports: [ToDoTaskStatusBadge, ToDoTaskMessageCount, MatIcon, ToDoUserAvatar],
  templateUrl: './to-do-my-item.html',
  styleUrl: './to-do-my-item.css',
})
export class ToDoMyItem {
  task = input.required<Task>();

  members = [
    { userId: 1, username: 'Artem', avatar: '' },
    { userId: 2, username: 'Ivan', avatar: '' },
  ];
}
