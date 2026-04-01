import { environment } from '../../../environments/environment';

export enum Voice {
  ALLY = 'alloy',
  ASH = 'ash',
  BALLAD = 'ballad',
  CORAL = 'coral',
  ECHO = 'echo',
  FABLE = 'fable',
  NOVA = 'nova',
  ONYX = 'onyx',
  SAGE = 'sage',
  SHIMMER = 'shimmer',
}

export const textToAudioUseCase = async (prompt: string, voice: Voice) => {
  try {
    const response = await fetch(environment.backendApi + '/text-to-audio', {
      method: 'POST',
      body: JSON.stringify({ prompt, voice }),
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'audio/mp3',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to convert text to audio');
    }

    // Explicitly return the mp3 file as a Blob
    const audioBlob = await response.blob();

    return {
      ok: true,
      message: prompt,
      audioBlob,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo convertir el texto a audio',
      audioBlob: null,
    };
  }
};
