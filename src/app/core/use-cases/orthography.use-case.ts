import { environment } from '../../../environments/environment';
import { OrthographyResponse } from '../../interfaces';

export const orthographyUseCase = async (
  prompt: string,
): Promise<
  {
    ok: boolean;
  } & OrthographyResponse
> => {
  try {
    const resp = await fetch(environment.backendApi + '/orthographyCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) {
      throw new Error('No se pudo realizar la corrección de ortografía');
    }

    const data: OrthographyResponse = await resp.json();

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección de ortografía',
    };
  }
};
