import { forwardRef } from "react";

type InputProps = {
  label: string;
  placeholder?: string;
  type: "text" | "password";
  name: string;
  id?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, name, id, placeholder }, ref) => (
    <>
      <label
        htmlFor={name}
        className="block leading-none text-sm font-bold text-slate-400 mb-3"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="block w-full rounded-lg border border-neutral-600 bg-black hover:border-blue-400 ease-in duration-150 focus:outline-0 active:outline-0 focus:border-blue-400 active:border-blue-400 text-base px-4 pb-1 h-11 text-white leading-none"
        placeholder={placeholder}
        ref={ref}
      />
    </>
  )
);

Input.displayName = "Input";

export default Input;
