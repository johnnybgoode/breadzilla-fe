import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Button } from './Button';

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

interface TimerProps {
  time: number;
  onDone: () => void;
  onTick: (nextTime: string) => void;
}

const useTimer = ({ time, onDone, onTick }: TimerProps) => {
  const intervalId = useRef<number | undefined>(undefined);
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    clearInterval(intervalId.current);
    setCompletionTime(Date.now() + time * 1000);
  }, [time]);

  const handleStop = useCallback(() => {
    clearInterval(intervalId.current);
    intervalId.current = undefined;
    setCompletionTime(null);
    onDone();
  }, [onDone]);

  useEffect(() => {
    const isRunning = completionTime !== null && completionTime > Date.now();
    if (isRunning && !intervalId.current) {
      onTick(formatTime(completionTime - Date.now()));

      intervalId.current = window.setInterval(() => {
        const timeDelta = completionTime - Date.now();
        if (timeDelta > 0) {
          onTick(formatTime(timeDelta));
        } else {
          handleStop();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId.current);
  }, [completionTime, handleStop, onTick]);

  return {
    handleStart,
    handleStop,
    isRunning:
      completionTime !== null &&
      completionTime > Date.now() &&
      intervalId.current !== undefined,
  } as const;
};

export const TimerButton = ({ time, onDone }: Omit<TimerProps, 'onTick'>) => {
  const [buttonText, setButtonText] = useState('Start');

  const handleDone = useCallback(() => {
    setButtonText('Start');
    onDone();
  }, [onDone]);

  const { handleStart } = useTimer({
    time,
    onDone: handleDone,
    onTick: setButtonText,
  });

  return <Button onClick={handleStart}>{buttonText}</Button>;
};

export const Timer = ({ time, onDone }: Omit<TimerProps, 'onTick'>) => {
  const timeFormatted = formatTime(time * 1000);
  const [timeLeft, setTimeLeft] = useState(timeFormatted);
  const handleDone = useCallback(() => {
    setTimeLeft(timeFormatted);
    onDone();
  }, [timeFormatted, onDone]);

  const { handleStart, isRunning } = useTimer({
    time,
    onDone: handleDone,
    onTick: setTimeLeft,
  });

  const timerId = useId();

  return (
    <>
      <div>
        <label htmlFor={timerId}>Time: </label>
        <input disabled={isRunning} id={timerId} value={timeLeft} />
      </div>
      <Button onClick={handleStart}>Start</Button>
    </>
  );
};
