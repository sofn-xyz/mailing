import { GetServerSideProps } from "next";
import { previewIndexLoader } from "mailing";
import { PreviewIndex, PreviewIndexProps } from "mailing/components";
import * from "../../emails/previews";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: await previewIndexLoader(),
  };
};

function Mailers(props: PreviewIndexProps) {
  return <PreviewIndex {...props} />;
}

export default Mailers;
