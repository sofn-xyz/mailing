import { ReactNode } from "react";

export default function FormSuccess(props: { children?: ReactNode }) {
  if (!props.children) return null;

  return (
    <div className="bg-green-300 col-span-3 rounded-md py-2 px-3 form-error text-black form-success-message">
      {props.children}
    </div>
  );
}
