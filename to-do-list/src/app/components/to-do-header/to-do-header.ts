import { Component, input } from '@angular/core';
import { ToDoLanguageSwitcher } from '../to-do-language-switcher/to-do-language-switcher';
import { ToDoAuthActions } from '../to-do-auth-actions/to-do-auth-actions';

@Component({
  selector: 'app-to-do-header',
  templateUrl: './to-do-header.html',
  styleUrl: './to-do-header.css',
  imports: [ToDoLanguageSwitcher, ToDoAuthActions],
})
export class ToDoHeader {
  readonly showLanguageSwitcher = input(false);
}
