import { Component } from '@angular/core';
import { Input } from '../input/input';

@Component({
  selector: 'app-to-do-form',
  imports: [Input],
  templateUrl: './to-do-form.html',
  styleUrl: './to-do-form.css',
})
export class ToDoForm {}
