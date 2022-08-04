const MDXComponents = {
  h1: (props) => <h1 {...props} className="text-3xl font-bold py-2" />,
  p: (props) => <p {...props} className="py-1" />,
  code: (props) => (
    <code
      {...props}
      className="block font-mono bg-slate-700 p-3 my-3 text-gray-100"
    />
  ),
};

export default MDXComponents;
