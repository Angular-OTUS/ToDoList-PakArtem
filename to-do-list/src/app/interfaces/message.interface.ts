import { Author } from './autor.interface';

export interface ChatMessage {
  id: number;
  author: Author;
  text: string;
  createdAt: string;
}
