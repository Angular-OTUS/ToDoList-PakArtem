import { Component, computed, inject, OnInit } from '@angular/core';
import { TodoStore } from '../../services/todo-store';
import { take } from 'rxjs';
import { ToDoMyItem } from '../../components/to-do-my-item/to-do-my-item';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-my-tasks',
  imports: [ToDoMyItem, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks implements OnInit {
  private readonly todoStore = inject(TodoStore);

  private readonly currentUserId = 1;

  myTasks = computed(() =>
    this.todoStore
      .tasks()
      .filter((task) => task.roles.some((role) => role.userId === this.currentUserId)),
  );

  ngOnInit() {
    this.todoStore.getTasks().pipe(take(1)).subscribe();
  }
}
