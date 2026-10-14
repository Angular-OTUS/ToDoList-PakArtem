import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-to-do-navigation',
  imports: [RouterLinkActive, RouterLink, MatIconModule],
  templateUrl: './to-do-navigation.html',
  styleUrl: './to-do-navigation.css',
})
export class ToDoNavigation {}
