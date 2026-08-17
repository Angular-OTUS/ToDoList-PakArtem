import { Service, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

interface Toast {
  id: string;
  message: string;
}

@Service()
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);

  readonly toasts = this._toasts.asReadonly();

  showToast(message: string, duration = 3000): void {
    const id = uuidv4();

    this._toasts.update(toasts => [
      ...toasts,
      {
        id,
        message,
      },
    ]);

    setTimeout(() => {
      this._toasts.update(toasts =>
        toasts.filter(toast => toast.id !== id),
      );
    }, duration);
  }
}
