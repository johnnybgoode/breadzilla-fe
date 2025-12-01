import { useCallback, useState } from 'react';
import type { Steps as StepsType } from '@/api/recipes';
import { Heading } from './Heading';
import { Timer } from './Timer';

interface StepsProps {
  steps: StepsType;
}

export function Steps({ steps }: StepsProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const advanceStep = useCallback(
    () => setCurrentStepIdx(currentStepIdx + 1),
    [currentStepIdx],
  );

  if (steps.length === 0 || steps[currentStepIdx] === undefined) {
    throw new Error('Step index out of bounds');
  }
  const currentStep = steps[currentStepIdx];

  const descriptionLines = currentStep.description.split('\n');

  return (
    <div className="flex flex-col items-center">
      <Heading className="text-gray-800" level={3}>
        {currentStep.title}
      </Heading>
      <ul>
        {descriptionLines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
      <div className="mt-4">
        {currentStep.time && (
          <Timer onDone={advanceStep} time={currentStep.time} />
        )}
      </div>
    </div>
  );
}
