import { InjectionToken } from '@angular/core';

export interface LocaleConfig {
  ru: string;
  en: string;
}

export const LOCALE_CONFIG = new InjectionToken<LocaleConfig>('LOCALE_CONFIG', {
  factory: () => ({
    ru: '',
    en: '',
  }),
});
