import Intercept from "../../components/Intercept";

const ShowIntercept = () => {
  const data = {
    html: "<html><body><h1>Title</h1>hope it's not too strict</body></html>",
    to: "Jacob <william@oek.com>",
    from: "HelloFrank Support <support@hellofrank.cre>",
    cc: ["systemwin@hellofrank.cre", "jerome@powel.com"],
    subject: "A test email",
  };

  return <Intercept data={data} />;
};

export default ShowIntercept;
