import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { getRecipes } from '@/api/recipes';
import { Head } from '@/components/Head';
import { Heading } from '@/components/Heading';
import { Image } from '@/components/Image';

export function Gallery() {
  const { data } = useSuspenseQuery({
    queryFn: getRecipes,
    queryKey: ['recipes'],
  });

  return (
    <>
      <Head title="Sourdough Recipes" />
      <div className="p-8">
        <Heading level={1}>Sourdough Recipes</Heading>
      </div>
      <div className="m-2 grid grid-cols-[minmax(0,384px)] gap-2 bg-gray-50 p-4 px-8 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]">
        {data.map(recipe => (
          <Link
            className="rounded-lg p-4 hover:bg-yellow-100 hover:shadow-lg"
            key={recipe.name}
            to={recipe.slug}
          >
            <div className="flex flex-col items-center hover:invert-25">
              <div className="mb-6 sm:mb-4">
                <Image alt={recipe.name} src={recipe.image} />
              </div>
              <h2 className="font-semibold text-lg">{recipe.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
