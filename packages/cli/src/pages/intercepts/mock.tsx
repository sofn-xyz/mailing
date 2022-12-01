import Intercept from "../../components/Intercept";

const ShowIntercept = () => {
  const data = {
    id: "mock",
    html: "<html><body><h1>Title</h1>hope it's not too strict</body></html>",
    to: "peter s. <peter+test@campsh.com>",
    from: { name: "peter", address: "peter+sendgrid@campsh.com" },
    subject: "A test email",
  };

  return <Intercept data={data} />;
};

export default ShowIntercept;
