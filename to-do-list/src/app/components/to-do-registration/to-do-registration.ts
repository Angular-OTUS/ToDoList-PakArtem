import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatSuffix } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-to-do-registration',
  imports: [
    MatButton,
    MatIconButton,
    MatButtonModule,
    MatIconModule,
    MatSuffix,
    MatInput,
    MatFormField,
    MatLabel,
    MatError,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './to-do-registration.html',
  styleUrl: './to-do-registration.css',
})
export class ToDoRegistration {
  readonly dialogRef = inject(MatDialogRef<ToDoRegistration>);

  model = {
    email: '',
    password: '',
  };

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  registration(): void {
    const email = this.model.email.trim();
    const password = this.model.password.trim();

    console.log(email);
    console.log(password);

    // this.dialogRef.close();
  }
}
