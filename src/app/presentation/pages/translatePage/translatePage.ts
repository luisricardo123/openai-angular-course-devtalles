import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  TextMessageBoxSelect,
  TextMessageBoxEvent,
  Option,
} from '../../components';
import { OpenAiService } from '../../services/openai.service';
import { Message } from '../../../interfaces';

@Component({
  selector: 'app-translate-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBox,
    TextMessageBoxSelect,
  ],
  templateUrl: './translatePage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public languages = signal<Option[]>([
    { id: 'Ingles', text: 'Ingles' },
    { id: 'Arabe', text: 'Arabe' },
    { id: 'Francés', text: 'Francés' },
    { id: 'Alemán', text: 'Alemán' },
    { id: 'Italiano', text: 'Italiano' },
    { id: 'Portugués', text: 'Portugués' },
    { id: 'Ruso', text: 'Ruso' },
    { id: 'Chino', text: 'Chino' },
  ]);

  async handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    console.log({ prompt, selectedOption });
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this.isLoading.set(true);
    const res = await this.openAiService.translateText(prompt, selectedOption);
    this.messages.update((prev) => [...prev, { text: res.message, isGpt: true }]);
    this.isLoading.set(false);
  }
}
