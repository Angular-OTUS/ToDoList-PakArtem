import { Component, input } from '@angular/core';
import { ChatMessage } from '../../interfaces/message.interface';
import { ToDoUserAvatar } from '../to-do-user-avatar/to-do-user-avatar';

@Component({
  selector: 'app-to-do-chat-message',
  imports: [ToDoUserAvatar],
  templateUrl: './to-do-chat-message.html',
  styleUrl: './to-do-chat-message.css',
  host: {
    '[class.mine]': 'isMine()',
  },
})
export class ToDoChatMessage {
  message = input.required<ChatMessage>();
  isMine = input<boolean>(false);
}
