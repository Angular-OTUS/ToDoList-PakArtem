import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface Toast {
  id: string;
  message: string;
}

@Service()
export class ToastService {
  private readonly _toasts = new BehaviorSubject<Toast[]>([]);

  readonly toasts = this._toasts.asObservable();

  showToast(message: string, duration = 3000): void {
    const id = uuidv4();

    this._toasts.next([
      ...this._toasts.value,
      {
        id,
        message,
      },
    ]);

    setTimeout(() => {
      this._toasts.next(this._toasts.value.filter((toast) => toast.id !== id));
    }, duration);
  }
}
