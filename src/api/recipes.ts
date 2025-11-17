import * as v from 'valibot';

const Portions = v.object({
  unit: v.string(),
  units: v.string(),
  value: v.number(),
});
export type Portions = v.InferOutput<typeof Portions>;

const Ingredient = v.object({
  name: v.string(),
  unit: v.string(),
  value: v.number(),
});
const Ingredients = v.array(Ingredient);
export type Ingredients = v.InferOutput<typeof Ingredients>;

const Step = v.object({
  title: v.string(),
  description: v.string(),
  time: v.optional(v.number()),
});
const Steps = v.array(Step);
export type Steps = v.InferOutput<typeof Steps>;

const Recipe = v.object({
  name: v.string(),
  slug: v.string(),
  credit: v.string(),
  image: v.string(),
  portions: Portions,
  ingredients: Ingredients,
  steps: Steps,
});
export type Recipe = v.InferOutput<typeof Recipe>;
const Recipes = v.array(Recipe);

export async function getRecipes() {
  const response = await fetch('/recipes');
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return v.parse(Recipes, await response.json());
}
