import { type FormEvent, useState } from 'react';
import type {
  Ingredients as IngredientsType,
  Portions as PortionsType,
} from '@/api/recipes';
import { Heading } from './Heading';

interface IngredientsProps {
  disabled: boolean;
  ingredients: IngredientsType;
  portions: PortionsType;
}

export function Ingredients({
  disabled,
  ingredients,
  portions,
}: IngredientsProps) {
  const [currentPortion, setCurrentPortion] = useState(portions.value);
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const nextPortion = e.currentTarget.value || 1;
    setCurrentPortion(Number(nextPortion));
  };

  const portionLabel = currentPortion === 1 ? portions.unit : portions.units;
  const portionMultiplier = currentPortion / portions.value;

  return (
    <div className="flex flex-col">
      <Heading className="text-center text-gray-800" level={3}>
        Ingredients
      </Heading>
      <div className="mb-2 font-bold">
        <span>
          Makes&nbsp;
          <input
            className={`w-12.5 rounded border-1 border-gray-500 pr-1 pl-1.5 ${disabled && 'text-gray-400'}`}
            disabled={disabled}
            max="13"
            min="1"
            onChange={onChange}
            type="number"
            value={currentPortion}
            width="10"
          />
          &nbsp;
          {portionLabel}
        </span>
      </div>
      <div>
        <ul>
          {ingredients.map(ingredient => {
            return (
              <li className="flex justify-between" key={ingredient.name}>
                <span className="font-semibold">{ingredient.name}:</span>{' '}
                <span>
                  {ingredient.value * portionMultiplier}
                  {ingredient.unit}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
