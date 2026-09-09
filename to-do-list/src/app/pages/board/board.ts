import { Component, computed, inject, OnInit } from '@angular/core';
import { ToDoBoardColumn } from '../../components/to-do-board-column/to-do-board-column';
import { TodoStatus } from '../../type/todo-status.type';
import { TodoService } from '../../services/todo';
import {
  CdkDragDrop,
  CdkDropListGroup,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Task } from '../../interfaces/task.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [ToDoBoardColumn, CdkDropListGroup],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  private readonly todoService = inject(TodoService);

  statuses: TodoStatus[] = ['ToDo', 'InProgress', 'Completed'];

  tasks = this.todoService.tasks;

  ngOnInit() {
    this.todoService.getTasks();
  }

  columns = computed(() =>
    this.statuses.map((status) => ({
      status,
      tasks: this.tasks()
        .filter((t) => t.status === status)
        .sort((a, b) => a.order - b.order),
    })),
  );

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      const currentTasks = event.container.data.map((task, index) => ({
        ...task,
        order: index,
      }));

      this.todoService.changeTaskOrder(currentTasks).subscribe({
        error: () => {
          this.todoService.reloadTasks();
        },
      });

      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const previousTasks = event.previousContainer.data.map((task, index) => ({
      ...task,
      order: index,
    }));

    const currentTasks = event.container.data.map((task, index) => ({
      ...task,
      order: index,
    }));

    const task = event.item.data;
    const newStatus = event.container.id as TodoStatus;

    forkJoin([
      this.todoService.changeTaskOrder([...previousTasks, ...currentTasks]),

      this.todoService.changeStatus(task.id, newStatus),
    ]).subscribe({
      error: () => {
        this.todoService.reloadTasks();
      },
    });
  }
}
