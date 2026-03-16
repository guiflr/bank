import * as React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={
          `border border-black bg-transparent px-3 py-2 text-sm rounded-md outline-none ` +
          `focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white ` +
          `dark:border-white dark:focus:ring-white dark:focus:ring-offset-black ${className}`
        }
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
