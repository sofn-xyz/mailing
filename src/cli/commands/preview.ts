exports.command = "preview";

exports.describe = "start the email preview server";

exports.builder = {
  port: {
    default: 3883,
  },
};

type ArgV = { port: number };

exports.handler = (argv: ArgV) => {
  console.log("implement me!", argv.port);
};
