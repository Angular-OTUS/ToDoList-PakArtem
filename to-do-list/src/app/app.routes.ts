import { Routes } from '@angular/router';
import { ToDoList } from './components/to-do-list/to-do-list';
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
