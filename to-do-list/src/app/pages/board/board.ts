import { Component, computed, inject, OnInit } from '@angular/core';
import { ToDoBoardColumn } from '../../components/to-do-board-column/to-do-board-column';
import { TodoStatus } from '../../type/todo-status.type';
import {
  CdkDragDrop,
  CdkDropListGroup,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Task } from '../../interfaces/task.interface';
import { forkJoin } from 'rxjs';
import { TodoStore } from '../../services/todo-store';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-board',
  imports: [ToDoBoardColumn, CdkDropListGroup],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  private readonly todoStore = inject(TodoStore);
  private readonly toastService = inject(ToastService);

  statuses: TodoStatus[] = ['ToDo', 'InProgress', 'Completed'];

  tasks = this.todoStore.tasks;

  ngOnInit() {
    this.todoStore.getTasks().subscribe();
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
        id: task.id,
        order: index,
      }));

      this.todoStore.changeTaskOrder(currentTasks).subscribe({
        next: () => {
          this.toastService.showToast('Порядок задач обновлён!');
        },
        error: () => {
          this.toastService.showToast('Ошибка изменения порядка!');
          this.todoStore.reloadTasks().subscribe();
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
      this.todoStore.changeTaskOrder([...previousTasks, ...currentTasks]),

      this.todoStore.changeTaskStatus(task.id, newStatus),
    ]).subscribe({
      next: () => {
        this.toastService.showToast('Порядок задач обновлён!');
      },
      error: () => {
        this.toastService.showToast('Ошибка изменения порядка!');
        this.todoStore.reloadTasks().subscribe();
      },
    });
  }
}
