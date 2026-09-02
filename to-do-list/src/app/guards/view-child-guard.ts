import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TodoService } from '../services/todo';

export const viewChildGuard: CanActivateFn = (route) => {
  const todoService = inject(TodoService);
  const router = inject(Router);

  const id = Number(route.paramMap.get('id'));
  const tasks = todoService.tasks();
  const exists = tasks.some((task) => task.id === id);

  if (exists) {
    return true;
  }

  return router.createUrlTree(['/tasks']);
};
