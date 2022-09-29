import { withSession } from "../util";
import { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = withSession(
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

const Settings: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <h1>Settings</h1>
      <p>Welcome back {props.user?.email}</p>

      <h2>API Keys</h2>
      <ul>
        <li>API Key 1</li>
      </ul>
    </>
  );
};

export default Settings;
