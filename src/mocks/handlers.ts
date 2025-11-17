import { delay, HttpResponse, http } from 'msw';
import recipes from './data/recipes.json' with { type: 'json' };

export const handlers = [
  http.get('/recipes', async () => {
    await delay('real');
    return HttpResponse.json(recipes);
  }),
];
