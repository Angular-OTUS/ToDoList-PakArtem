import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-to-do-navigation',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './to-do-navigation.html',
  styleUrl: './to-do-navigation.css',
})
export class ToDoNavigation {}
