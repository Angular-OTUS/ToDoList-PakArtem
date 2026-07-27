import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-to-do-toast',
  imports: [],
  templateUrl: './to-do-toast.html',
  styleUrl: './to-do-toast.css',
})
export class ToDoToast {
  protected toastService = inject(ToastService);
}
