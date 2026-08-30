import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TodoService } from '../../services/todo';
import { ToastService } from '../../services/toast';
import { TodoStatus } from '../../type/todo-status.type';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.css',
})
export class ToDoItemView {
  private readonly route = inject(ActivatedRoute);
  private readonly todoService = inject(TodoService);
  private readonly toastService = inject(ToastService);

  readonly tasks = this.todoService.tasks;

  taskId = toSignal(
    this.route.paramMap.pipe(
      map((params) => {
        const id = params.get('id');
        return id ? Number(id) : null;
      }),
    ),
  );

  readonly task = computed(() => {
    const id = this.taskId();

    if (id === null) return null;

    return this.tasks().find(task => Number(task.id) === id) ?? null;
  });

  onStatusChange(checked: boolean): void {
      const newStatus: TodoStatus = checked ? 'Completed' : 'InProgress';

       this.todoService.changeStatus(this.taskId()!, newStatus);

      this.toastService.showToast(
        newStatus === 'Completed' ? 'Задача выполнена!' : 'Задача возвращена в работу!',
      );
    }
}
