import { Routes } from '@angular/router';
import { ToDoItemViewWrapper } from './components/to-do-item-view-wrapper/to-do-item-view-wrapper';
import { Backlog } from './pages/backlog/backlog';
import { Board } from './pages/board/board';
import { MyTasks } from './pages/my-tasks/my-tasks';
import { ToDoTaskChat } from './components/to-do-task-chat/to-do-task-chat';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'backlog',
    component: Backlog,
    data: { titleKey: $localize`:@@navigationBacklog:Backlog` },
    children: [
      {
        path: ':id',
        component: ToDoItemViewWrapper,
        data: { titleKey: $localize`:@@navigationTaskDetail:TaskDetail` },
      },
    ],
  },
  {
    path: 'board',
    component: Board,
    data: { titleKey: $localize`:@@navigationBoard:Board` },
    children: [
      {
        path: ':id',
        component: ToDoItemViewWrapper,
        data: { titleKey: $localize`:@@navigationTaskDetail:TaskDetail` },
      },
    ],
  },
  {
    path: 'myTasks',
    component: MyTasks,
    data: { titleKey: $localize`:@@navigationBoard:myTasks` },
    children: [
      {
        path: ':id',
        component: ToDoTaskChat,
        data: { titleKey: $localize`:@@navigationTaskDetail:Chat` },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
