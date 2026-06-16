import { Component } from '@angular/core';
import { Input } from '../input/input';
import { Button } from '../button/button';

@Component({
  selector: 'app-to-do-form',
  imports: [Input, Button],
  templateUrl: './to-do-form.html',
  styleUrl: './to-do-form.css',
})
export class ToDoForm {}
