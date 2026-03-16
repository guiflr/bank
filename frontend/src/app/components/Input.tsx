import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, ...props }, ref) => {
    return (
      <label className="grid gap-2 text-xs uppercase tracking-[0.2em]">
        {label && label}
        <input
          ref={ref}
          className={
            `border border-black bg-transparent px-3 py-2 text-sm rounded-md outline-none ` +
            `focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white ` +
            `dark:border-white dark:focus:ring-white dark:focus:ring-offset-black ${className}`
          }
          {...props}
        />
      </label>
    );
  },
);

Input.displayName = "Input";

export default Input;
