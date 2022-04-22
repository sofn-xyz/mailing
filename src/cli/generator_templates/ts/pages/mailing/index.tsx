import { GetServerSideProps } from "next";
import { previewIndexLoader } from "mailing";
import { PreviewIndex, PreviewIndexProps } from "mailing/components";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: previewIndexLoader(),
  };
};

function Mailers(props: PreviewIndexProps) {
  return <PreviewIndex {...props} />;
}

export default Mailers;
