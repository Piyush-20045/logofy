interface HeadingDescProps {
  title: string;
  desc: string;
}

const HeadingDesc = ({ title, desc }: HeadingDescProps) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 flex items-center gap-1">
        {title}
      </h1>
      <p className="mt-1 text-lg font-semibold text-gray-700">{desc}</p>
    </div>
  );
};

export default HeadingDesc;
