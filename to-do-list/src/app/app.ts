import { Component, inject } from '@angular/core';
import { ToDoToast } from './components/to-do-toast/to-do-toast';
import { ActivatedRouteSnapshot, ActivationEnd, Router, RouterOutlet } from '@angular/router';
import { ToDoSidebar } from './components/to-do-sidebar/to-do-sidebar';
import { ToDoContainer } from './components/to-do-container/to-do-container';
import { ToDoHeader } from './components/to-do-header/to-do-header';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ToDoToast, RouterOutlet, ToDoSidebar, ToDoContainer, ToDoHeader, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  readonly currentPage = this.router.events.pipe(
    filter((e): e is ActivationEnd => e instanceof ActivationEnd),
    map((e) => this.getDeepestRouteTitle(e.snapshot)),
    distinctUntilChanged(),
  );

  private getDeepestRouteTitle(route: ActivatedRouteSnapshot): string {
    if (route.children.length === 0) {
      return route.data['titleKey'];
    }
    for (const child of route.children) {
      const nested = this.getDeepestRouteTitle(child);
      if (nested) {
        return nested;
      }
    }
    return route.data['titleKey'];
  }
}
