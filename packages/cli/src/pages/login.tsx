import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { host, protocol } = context.req.headers;
  console.log(context.req.headers);

  const mailingHost = /localhost/.test(host!)
    ? "http://localhost:3000"
    : "https://www.mailing.run";

  const redirectTo = encodeURIComponent(
    protocol + "//" + host + "/api/oauth/postSignup"
  );
  const signupUrl = `${mailingHost}/signup?redirectTo=${redirectTo}`;

  return {
    props: {},
    redirect: {
      destination: signupUrl,
      permanent: false,
    },
  };
};

const Login: NextPage = () => {
  return null;
};

export default Login;
