import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-chat-message',
  imports: [MarkdownComponent],
  templateUrl: './chatMessage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessage {
  text = input.required<string>();
  audio = input<string>('');
  imageInfo = input<{
    url: string;
    alt: string;
  }>();
}
