import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ToDoItemView } from '../to-do-item-view/to-do-item-view';
import { ToDoErrorState } from '../to-do-error-state/to-do-error-state';
import { TodoService } from '../../services/todo';
import { ToastService } from '../../services/toast';
import { TodoStatus } from '../../type/todo-status.type';

@Component({
  selector: 'app-to-do-item-view-wrapper',
  imports: [ToDoItemView, ToDoErrorState],
  templateUrl: './to-do-item-view-wrapper.html',
  styleUrl: './to-do-item-view-wrapper.css',
})
export class ToDoItemViewWrapper {
  private readonly route = inject(ActivatedRoute);
  private readonly todoService = inject(TodoService);
  private readonly toastService = inject(ToastService);

  readonly tasks = this.todoService.tasks;

  taskId = toSignal(
    this.route.paramMap.pipe(
      map((params) => {
        const id = params.get('id');

        if (id === null) {
          return null;
        }

        const idNumber = Number(id);

        if (Number.isNaN(idNumber)) {
          return null;
        }

        return idNumber;
      }),
    ),
  );

  readonly task = computed(() => {
    const id = this.taskId();

    if (id === null) return null;

    return this.tasks().find((task) => Number(task.id) === id) ?? null;
  });

  onStatusChange(checked: boolean): void {
    const newStatus: TodoStatus = checked ? 'Completed' : 'InProgress';

    this.todoService.changeStatus(this.taskId()!, newStatus);

    this.toastService.showToast(
      newStatus === 'Completed' ? 'Задача выполнена!' : 'Задача возвращена в работу!',
    );
  }
}
