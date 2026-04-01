import { environment } from '../../../environments/environment';
import { AudioToTextResponse } from '../../interfaces/audio-to-text.response';

export const audioToTextUseCase = async (file: File, prompt: string) => {
  try {
    const formData = new FormData();

    formData.append('audio', file);

    if (prompt) formData.append('prompt', prompt);

    const res = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

    const data = await res.json();

    return data as AudioToTextResponse;
  } catch (error) {
    console.log(error);

    return null;
  }
};
