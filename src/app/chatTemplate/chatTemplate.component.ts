import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '../presentation/components';
import { Message } from '../interfaces';
import { OpenAiService } from '../presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log({ prompt });
  }

  // handleMessageWithFile( { prompt, file }: TextMessageEvent ) {

  //   console.log({ prompt, file });

  // }

  // handleMessageWithSelect( event: TextMessageBoxEvent ) {
  //   console.log(event);
  // }
}
