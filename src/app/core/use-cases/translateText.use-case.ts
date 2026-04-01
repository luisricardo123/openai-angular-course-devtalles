import { environment } from '../../../environments/environment';
import { TranslateResponse } from '../../interfaces/translate.response';

export const translateTextUseCase = async (
  prompt: string,
  lang: string,
): Promise<
  {
    ok: boolean;
  } & TranslateResponse
> => {
  try {
    const resp = await fetch(environment.backendApi + '/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) {
      throw new Error('No se pudo traducir el texto');
    }

    const data: TranslateResponse = await resp.json();

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo traducir el texto',
    };
  }
};
