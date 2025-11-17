import type { ElementType, HTMLAttributes, PropsWithChildren } from 'react';

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5;
} & HTMLAttributes<HTMLHeadingElement> &
  PropsWithChildren;

const useTextSize = (level: number) => {
  switch (level) {
    case 1:
      return 'text-5xl';
    case 2:
      return 'text-3xl';
    case 3:
      return 'text-2xl';
    case 4:
      return 'text-xl';
    default:
      return 'text-lg';
  }
};

const useFontWeight = (level: number) => {
  switch (level) {
    case 1:
      return 'font-bold';
    default:
      return 'font-semibold';
  }
};

const useSpace = (level: number) => {
  switch (level) {
    case 1:
      return 'mb-3';
    case 2:
    case 3:
      return 'mb-2';
    default:
      return 'mb-1';
  }
};

export function Heading({ level, className, children }: HeadingProps) {
  const HeadingTag: ElementType<HTMLAttributes<HTMLHeadingElement>> =
    `h${level}`;
  const textSize = useTextSize(level);
  const fontWeight = useFontWeight(level);
  const space = useSpace(level);
  return (
    <HeadingTag className={`${textSize} ${fontWeight} ${space} ${className}`}>
      {children}
    </HeadingTag>
  );
}
