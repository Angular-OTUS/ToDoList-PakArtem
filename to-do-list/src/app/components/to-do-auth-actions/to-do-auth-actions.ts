import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToDoRegistration } from '../to-do-registration/to-do-registration';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-to-do-auth-actions',
  imports: [MatButtonModule],
  templateUrl: './to-do-auth-actions.html',
  styleUrl: './to-do-auth-actions.css',
})
export class ToDoAuthActions {
  private dialog = inject(MatDialog);

  openLogin(): void {}

  openRegistration(): void {
    this.dialog.open(ToDoRegistration, {
      width: '420px',
    });
  }
}
