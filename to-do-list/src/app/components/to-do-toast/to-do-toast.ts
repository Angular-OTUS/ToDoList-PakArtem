import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-to-do-toast',
  imports: [AsyncPipe],
  templateUrl: './to-do-toast.html',
  styleUrl: './to-do-toast.css',
})
export class ToDoToast {
  protected toastService = inject(ToastService);
}
