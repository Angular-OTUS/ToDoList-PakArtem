import { Component, input } from '@angular/core';
import { ToDoLanguageSwitcher } from '../to-do-language-switcher/to-do-language-switcher';

@Component({
  selector: 'app-to-do-header',
  templateUrl: './to-do-header.html',
  styleUrl: './to-do-header.css',
  imports: [ToDoLanguageSwitcher],
})
export class ToDoHeader {
  readonly showLanguageSwitcher = input(false);
}
