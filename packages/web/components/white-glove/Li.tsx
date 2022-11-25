type LiProps = {
  title: string;
  description: string;
  index: number;
};

export default function Li({ title, description, index }: LiProps) {
  return (
    <div className="flex max-w-4xl  mt-8 sm:mt-12">
      <div className="text-green-200 leading-[.9] font-serif font-bold text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] min-w-[72px]">
        {index}
      </div>
      <div className="ml-6 sm:ml-16">
        <div className="text-2xl sm:text-3xl md:text-4xl">{title}</div>
        <div className="text-lg md:text-2xl mt-3 sm:mt-6">{description}</div>
      </div>
    </div>
  );
}
