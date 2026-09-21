import { Component, inject, LOCALE_ID } from '@angular/core';
import { ToDoButton } from '../to-do-button/to-do-button';

@Component({
  selector: 'app-to-do-language-switcher',
  imports: [ToDoButton],
  templateUrl: './to-do-language-switcher.html',
  styleUrl: './to-do-language-switcher.css',
})
export class ToDoLanguageSwitcher {
  private readonly currentLocale = inject(LOCALE_ID);

  locales = [
    {
      code: 'ru',
      titel: 'Русский',
      url: 'http://localhost:4201',
    },
    {
      code: 'en-US',
      titel: 'English',
      url: 'http://localhost:4200',
    },
  ];

  switchLocale(locale: string) {
    window.location.href = locale;
  }

  isActive(locale: string): boolean {
    return locale === this.currentLocale;
  }
}
