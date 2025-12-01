import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {};

export function Button({
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const disabledClasses = disabled
    ? 'bg-gray-400 cursor-not-allowed pointer-none hover:bg-gray-400'
    : '';
  return (
    <button
      className={`min-w-25 cursor-pointer rounded bg-blue-500 p-3 text-white hover:bg-blue-700 hover:text-gray-50 ${className} ${disabledClasses}`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
