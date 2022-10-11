import { ReactNode } from "react";

export default function FormError(props: { children?: ReactNode }) {
  if (!props.children) return null;

  return (
    <div className="bg-red-300 col-span-3 rounded-md py-[8px] px-[12px]">
      {props.children}
    </div>
  );
}
