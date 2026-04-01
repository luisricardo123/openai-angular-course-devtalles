import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsUseCase,
  prosConsStreamUseCase,
  audioToTextUseCase,
  translateTextUseCase,
  textToAudioUseCase,
  Voice,
} from '../../core/use-cases';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  public checkOrthography(prompt: string) {
    return orthographyUseCase(prompt);
  }

  public checkProsCons(prompt: string) {
    return prosConsUseCase(prompt);
  }

  public checkProsConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  public translateText(text: string, targetLanguage: string) {
    return translateTextUseCase(text, targetLanguage);
  }

  public textToAudio(text: string, voice: Voice) {
    return textToAudioUseCase(text, voice);
  }

  public audioToText(prompt: string, file: File) {
    return audioToTextUseCase(file, prompt);
  }
}
