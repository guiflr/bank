"use client";

import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  requiredMessage?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      required,
      requiredMessage = "Campo obrigatório",
      onInvalid,
      onInput,
      ...props
    },
    ref,
  ) => {
    const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
      if (required) {
        event.currentTarget.setCustomValidity(requiredMessage);
      }
      onInvalid?.(event);
    };

    const handleInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
      event.currentTarget.setCustomValidity("");
      onInput?.(event as unknown as React.InputEvent<HTMLInputElement>);
    };

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
          required={required}
          onInvalid={handleInvalid}
          onInput={handleInput}
          {...props}
        />
      </label>
    );
  },
);

Input.displayName = "Input";

export default Input;
