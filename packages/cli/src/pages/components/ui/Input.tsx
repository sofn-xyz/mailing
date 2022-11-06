import { forwardRef } from "react";

type InputProps = {
  label: string;
  placeholder?: string;
  type: "text" | "email" | "password";
  name: string;
  id?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type, name, id }, ref) => (
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
        className="block w-full rounded-lg border border-neutral-600 bg-black hover:border-blue ease-in duration-150 focus:outline-0 active:outline-0 focus:border-blue active:border-blue text-base px-4 pb-1 h-11 text-white leading-none"
        placeholder={placeholder}
        ref={ref}
      ></input>
    </>
  )
);

Input.displayName = "Input";

export default Input;
