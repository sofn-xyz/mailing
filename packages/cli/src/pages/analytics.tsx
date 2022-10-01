import { withSessionSsr } from "../util/session";
import { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = withSessionSsr<{ user: any }>(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

const Analytics: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <h1>Analytics - hi {props.user?.email}</h1>
    </>
  );
};

export default Analytics;
