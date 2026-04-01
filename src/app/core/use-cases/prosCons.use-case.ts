import { environment } from '../../../environments/environment';
import { ProsConsResponse } from '../../interfaces';

export const prosConsUseCase = async (
  prompt: string,
): Promise<
  {
    ok: boolean;
  } & ProsConsResponse
> => {
  try {
    const resp = await fetch(environment.backendApi + '/pros-cons-discusser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) {
      throw new Error('No se pudo realizar la comparación de pros y contras');
    }

    const data: string = await resp.text();

    return {
      ok: true,
      content: data,
      role: 'gpt',
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      role: '',
      content: 'No se pudo realizar la comparación de pros y contras',
    };
  }
};
