import { environment } from '../../../environments/environment';
import { ProsConsResponse } from '../../interfaces';

export async function* prosConsStreamUseCase(
  prompt: string,
  abortSignal: AbortSignal,
): AsyncGenerator<string | null> {
  try {
    const resp = await fetch(environment.backendApi + '/pros-cons-discusser-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal,
    });

    if (!resp.ok) {
      throw new Error('No se pudo realizar la comparación de pros y contras con stream');
    }

    const reader = resp.body?.getReader();

    if (!reader) throw new Error('No se pudo obtener el reader');

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const decoderChunk = decoder.decode(value, { stream: true });
      text += decoderChunk;

      yield text;
    }

    return text;
  } catch (error) {
    console.log(error);
    return null;
  }
}
