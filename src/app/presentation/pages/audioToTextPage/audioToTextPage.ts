import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiService } from '../../services/openai.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  TextMessageBoxFile,
  TextMessageEvent,
} from '../../components';
import { Message } from '../../../interfaces';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBoxFile,
  ],
  templateUrl: './audioToTextPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  async handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt });
    this.messages.update((prev) => [...prev, { text: prompt!, isGpt: false }]);
    this.isLoading.set(true);
    const res = await this.openAiService.audioToText(prompt ?? '', file);
    this.messages.update((prev) => [...prev, { text: res!.text, isGpt: true }]);

    for (const segment of res!.segments) {
      const segmentMessage = `
        __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
        ${segment.text}
      `;
      this.messages.update((prev) => [...prev, { text: segmentMessage, isGpt: true }]);
    }

    this.isLoading.set(false);
  }
}
