import { Service, signal } from '@angular/core';

@Service()
export class ToastService {
  readonly toasts = signal<string[]>([]);

  showToast(message: string, duration = 3000): void {
    this.toasts.update(toasts => [...toasts, message]);

    setTimeout(() => {
      this.toasts.update(toasts => {
        const index = toasts.indexOf(message);

        if (index === -1) return toasts;

        return toasts.filter((_, i) => i !== index);
      });
    }, duration);
  }
}
