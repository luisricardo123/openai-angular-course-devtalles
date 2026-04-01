import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiService } from '../../services/openai.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  Option,
  TextMessageBoxEvent,
} from '../../components';
import { Message } from '../../../interfaces';
import { Voice } from '../../../core/use-cases';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessage,
    MyMessage,
    TypingLoader,
    TextMessageBoxSelect,
  ],
  templateUrl: './textToAudioPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public voices = signal<Option[]>([
    { id: Voice.ALLY, text: 'Alloy' },
    { id: Voice.ASH, text: 'Ash' },
    { id: Voice.BALLAD, text: 'Ballad' },
    { id: Voice.CORAL, text: 'Coral' },
    { id: Voice.ECHO, text: 'Echo' },
    { id: Voice.FABLE, text: 'Fable' },
    { id: Voice.NOVA, text: 'Nova' },
    { id: Voice.ONYX, text: 'Onyx' },
    { id: Voice.SAGE, text: 'Sage' },
    { id: Voice.SHIMMER, text: 'Shimmer' },
  ]);

  async handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    console.log({ prompt, selectedOption });
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);
    this.isLoading.set(true);
    const { audioBlob, message } = await this.openAiService.textToAudio(
      prompt,
      selectedOption as Voice,
    );

    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    this.messages.update((prev) => [...prev, { text: message, isGpt: true, audio: url }]);
    console.log({ res: url });
    this.isLoading.set(false);
  }
}
