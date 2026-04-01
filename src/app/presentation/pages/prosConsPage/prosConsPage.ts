import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  TextMessageEvent,
  TextMessageBoxEvent,
} from '../../components';

@Component({
  selector: 'app-pros-cons-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
  ],
  templateUrl: './prosConsPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  async handleMessage(prompt: string) {
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this.isLoading.set(true);
    const res = await this.openAiService.checkProsCons(prompt);
    this.messages.update((prev) => [...prev, { text: res.content, isGpt: true }]);
    this.isLoading.set(false);
  }
}
