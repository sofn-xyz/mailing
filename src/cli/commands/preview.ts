const DEFAULT_PORT = 3883;

exports.command = "preview";

exports.describe = "start the email preview server";

exports.builder = {
  port: {
    default: DEFAULT_PORT,
  },
};

type ArgV = { port: number };

exports.handler = (argv?: ArgV) => {
  const port = argv?.port || DEFAULT_PORT;
  console.log("implement me!", port);
};
