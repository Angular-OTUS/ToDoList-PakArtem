import { Component, inject, signal } from '@angular/core';
import { ToDoToast } from './components/to-do-toast/to-do-toast';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToDoSidebar } from './components/to-do-sidebar/to-do-sidebar';
import { ToDoContainer } from './components/to-do-container/to-do-container';
import { ToDoHeader } from './components/to-do-header/to-do-header';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ToDoToast, RouterOutlet, ToDoSidebar, ToDoContainer, ToDoHeader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('to-do-list');

  private readonly router = inject(Router);

  readonly currentPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/')[1] ?? ''),
    ),
    {
      initialValue: this.router.url.split('/')[1] ?? '',
    },
  );
}
