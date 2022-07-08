import { GetServerSideProps } from "next";

type HomeProps = {
  previews: { [key: string]: string[] };
};

const Home: React.FC<HomeProps> = ({ previews }) => {
  return <div>{JSON.stringify(previews)}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.resolvedUrl);
  const previews = await fetch("http://localhost:3883/previews.json");
  return { props: { previews: await previews.json() } };
};

export default Home;
