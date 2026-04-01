import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  TextMessageBoxEvent,
  TextMessageEvent,
  TextMessageBoxFile,
  TextMessageBox,
} from '../../components';
import { OpenAiService } from '../../services/openai.service';
import { Message } from '../../../interfaces';
import { GptMessageOrthography } from '../../components/chat-bubbles/gptMessageOrthography/gptMessageOrthography';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBoxSelect,
    TextMessageBoxFile,
    TextMessageBox,
    GptMessageOrthography,
  ],
  templateUrl: './orthographyPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPage {
  public messages = signal<Message[]>([{ text: 'Hola Mundo', isGpt: false }]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  async handleMessage(prompt: string) {
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this.isLoading.set(true);
    const res = await this.openAiService.checkOrthography(prompt);
    this.messages.update((prev) => [...prev, { text: res.message, isGpt: true, info: res }]);
    this.isLoading.set(false);
  }

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt, file });
  }

  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event);
  }
}
