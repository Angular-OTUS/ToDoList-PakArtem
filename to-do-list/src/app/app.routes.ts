import { Routes } from '@angular/router';
import { ToDoList } from './components/to-do-list/to-do-list';
import { ToDoItemView } from './components/to-do-item-view/to-do-item-view';

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
        component: ToDoItemView,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
