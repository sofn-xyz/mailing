import { withIronSessionSsr } from "iron-session/next";
import { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = withIronSessionSsr(
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
  },
  {
    cookieName: "mailing",
    password: process.env.SESSION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    ttl: 0,
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
