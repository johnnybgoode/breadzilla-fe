import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getRecipes } from '@/api/recipes';
import { Button } from '@/components/Button';
import { Head } from '@/components/Head';
import { Heading } from '@/components/Heading';
import { Image } from '@/components/Image';
import { Ingredients } from '@/components/Ingredients';
import { LoadingOrError } from '@/components/LoadingOrError';
import { Steps } from '@/components/Steps';

export function RecipeDetails() {
  const { recipeSlug } = useParams();

  const { data } = useSuspenseQuery({
    queryFn: getRecipes,
    queryKey: ['recipes'],
  });

  const recipe = data?.find(r => r.slug === recipeSlug);

  const [isStarted, setIsStarted] = useState(false);

  if (!recipe) {
    const e = new Error(`Recipe not found: ${recipeSlug}`);
    return <LoadingOrError error={e} />;
  }

  return (
    <>
      <Head title={recipe.name} />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-10">
        <div className="my-8 flex">
          <Image alt={recipe.name} src={recipe.image} width={250} />
          <div className="ml-10">
            <Heading className="mt-8 mb-2" level={1}>
              {recipe.name}
            </Heading>
            <em>{recipe.credit}</em>
          </div>
        </div>
        <div className="mb-4 flex w-full justify-start gap-10">
          <div className="min-w-60">
            <Ingredients
              disabled={isStarted}
              ingredients={recipe.ingredients}
              portions={recipe.portions}
            />
            <div className="mt-4 flex justify-center">
              <Button disabled={isStarted} onClick={() => setIsStarted(true)}>
                Bake!
              </Button>
            </div>
          </div>
          <div className="mx-0">
            {isStarted && <Steps steps={recipe.steps} />}
          </div>
        </div>
      </div>
    </>
  );
}
