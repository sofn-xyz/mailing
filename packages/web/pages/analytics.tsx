import { withSession } from "../util";
import { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = withSession(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    console.log(user);

    // if (user.admin !== true) {
    //   return {
    //     notFound: true,
    //   };
    // }

    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

const Analytics: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <h1>Analytics - hi {props.user?.email}</h1>
    </>
  );
};

export default Analytics;
