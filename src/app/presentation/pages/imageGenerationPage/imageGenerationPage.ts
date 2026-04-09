import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiService } from '../../services/openai.service';
import { Message } from '../../../interfaces';

@Component({
  selector: 'app-image-generation-page',
  imports: [],
  templateUrl: './imageGenerationPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPage {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  async handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update( prev => [...prev, { isGpt: true, text: prompt }]);

    const response = await this.openAiService.ImageGeneration(prompt);

    
  }
}
