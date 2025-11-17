import { useCallback, useEffect, useRef, useState } from 'react';
import type { Steps as StepsType } from '@/api/recipes';
import { Button } from './Button';
import { Heading } from './Heading';

const formatTime = (timeMs: number) => {
  const timeSeconds = Math.floor(timeMs / 1000);
  const hours = Math.floor(timeSeconds / 3600);
  const minutes = Math.floor((timeSeconds - hours * 3600) / 60);
  const seconds = timeSeconds - minutes * 60;
  const hourStr = `${hours}`.padStart(2, '0');
  const minuteStr = `${minutes}`.padStart(2, '0');
  const secondStr = `${seconds}`.padStart(2, '0');

  return `${hourStr}:${minuteStr}:${secondStr}`;
};

interface TimerButtonProps {
  time: number;
  onDone: () => void;
}

const TimerButton = ({ time, onDone }: TimerButtonProps) => {
  const intervalId = useRef<number | undefined>(undefined);
  const [buttonText, setButtonText] = useState('Start');
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    clearInterval(intervalId.current);
    setCompletionTime(Date.now() + time * 1000);
  }, [time]);

  const handleStop = useCallback(() => {
    clearInterval(intervalId.current);
    intervalId.current = undefined;
    setCompletionTime(null);
    setButtonText('Start');
  }, []);

  useEffect(() => {
    const isRunning = completionTime !== null && completionTime > Date.now();
    if (isRunning && !intervalId.current) {
      setButtonText(formatTime(completionTime - Date.now()));

      intervalId.current = window.setInterval(() => {
        const timeDelta = completionTime - Date.now();
        if (timeDelta > 0) {
          setButtonText(formatTime(timeDelta));
        } else {
          handleStop();
          onDone();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId.current);
  }, [completionTime, handleStop, onDone]);

  return <Button onClick={handleStart}>{buttonText}</Button>;
};

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
          <TimerButton onDone={advanceStep} time={currentStep.time} />
        )}
      </div>
    </div>
  );
}
