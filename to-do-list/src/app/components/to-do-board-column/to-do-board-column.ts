import { Component, input, output } from '@angular/core';
import { TodoStatus } from '../../type/todo-status.type';
import { Task } from '../../interfaces/task.interface';
import { CdkDropList, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do-board-column',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './to-do-board-column.html',
  styleUrl: './to-do-board-column.css',
})
export class ToDoBoardColumn {
  status = input.required<TodoStatus>();
  tasks = input.required<Task[]>();

  taskDrop = output<CdkDragDrop<Task[]>>();

  getStatusLabel(status: TodoStatus): string {
    switch (status) {
      case 'ToDo':
        return $localize`:@@toDoStatus:ToDo`;
      case 'InProgress':
        return $localize`:@@inProgressStatus:In Progress`;
      case 'Completed':
        return $localize`:@@completedStatus:Completed`;
    }
  }
}
