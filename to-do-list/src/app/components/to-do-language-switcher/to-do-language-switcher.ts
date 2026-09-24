import { Component, inject, LOCALE_ID } from '@angular/core';
import { ToDoButton } from '../to-do-button/to-do-button';
import { LOCALE_CONFIG } from '../../services/locale-config';

@Component({
  selector: 'app-to-do-language-switcher',
  imports: [ToDoButton],
  templateUrl: './to-do-language-switcher.html',
  styleUrl: './to-do-language-switcher.css',
})
export class ToDoLanguageSwitcher {
  private readonly currentLocale = inject(LOCALE_ID);
  private readonly localeConfig = inject(LOCALE_CONFIG);

  locales = [
    {
      code: 'ru',
      title: 'Русский',
      url: this.localeConfig.ru,
    },
    {
      code: 'en-US',
      title: 'English',
      url: this.localeConfig.en,
    },
  ];

  switchLocale(locale: string) {
    window.location.href = locale;
  }

  isActive(locale: string): boolean {
    return locale === this.currentLocale;
  }
}
