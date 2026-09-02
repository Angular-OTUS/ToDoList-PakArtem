import { Routes } from '@angular/router';
import { ToDoList } from './components/to-do-list/to-do-list';
import { viewChildGuard } from './guards/view-child-guard';
import { ToDoItemViewWrapper } from './components/to-do-item-view-wrapper/to-do-item-view-wrapper';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: ToDoList,
    canActivateChild: [viewChildGuard],
    children: [
      {
        path: ':id',
        component: ToDoItemViewWrapper,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
