import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiService } from '../../services/openai.service';
import { Message } from '../../../interfaces';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';

@Component({
  selector: 'app-image-generation-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './imageGenerationPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  async handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { isGpt: false, text: prompt }]);

    const response = await this.openAiService.ImageGeneration(prompt);

    if (!response) {
      this.messages.update((prev) => [
        ...prev,
        { isGpt: true, text: 'Ocurrió un error en el servicio' },
      ]);

      this.isLoading.set(false);

      return;
    }

    const { alt, url } = response;

    this.messages.update((prev) => [
      ...prev,
      { isGpt: true, text: 'Esta es la imagen que me pediste', imageInfo: { alt, url } },
    ]);

    this.isLoading.set(false);
  }
}
