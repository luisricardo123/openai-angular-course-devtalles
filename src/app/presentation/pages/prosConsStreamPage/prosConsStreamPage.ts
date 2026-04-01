import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './prosConsStreamPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  // public abortSignal = signal(new AbortController());
  public abortController = new AbortController();

  async handleMessage(prompt: string) {
    this.abortController.abort();
    this.abortController = new AbortController();

    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.isLoading.set(true);

    const stream = this.openAiService.checkProsConsStream(prompt, this.abortController.signal);
    let textInitialized = false;

    for await (const text of stream) {
      console.log(text);
      if (textInitialized) {
        this.messages.update((prev) => {
          const lastMessage = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...lastMessage, text: text ?? '' }];
        });
      } else {
        this.messages.update((prev) => [...prev, { text: '', isGpt: true }]);
        textInitialized = true;
        this.isLoading.set(false);
      }
    }
  }
}
