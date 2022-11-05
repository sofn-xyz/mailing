type Input = {
  label: string;
  htmlFor?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  ref?: string;
};

const Input: React.FC<Input> = ({
  label,
  htmlFor,
  type,
  name,
  id,
  placeholder,
  ref,
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
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
  );
};

export default Input;
