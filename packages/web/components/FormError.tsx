export default function FormError(props) {
  if (!props.children) return;

  return (
    <div className="bg-red-300 col-span-3 rounded-md py-[8px] px-[12px]">
      {props.children}
    </div>
  );
}
