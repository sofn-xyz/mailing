import { ReactNode } from "react";

export default function FormError(props: { children?: ReactNode }) {
  if (!props.children) return null;

  return (
    <div className="top-12 left-[62px] right-0 absolute text-center bg-red-400 text-black w-80 mx-auto rounded-md pt-2 pb-3 px-3 form-error">
      {props.children}
    </div>
  );
}
