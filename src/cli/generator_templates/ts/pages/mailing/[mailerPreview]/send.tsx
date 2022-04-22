import React from "react";
import { GetServerSideProps } from "next";
import mailerPreviews from "util/mailer-previews";

export default function Mailers() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  res,
}) => {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Mailer previews available in development");
  }
  const key = params.mailerPreview as string;
  if (mailerPreviews[key]) {
    mailerPreviews[key](query.deliverTo);
  }
  res.writeHead(302, { Location: "/dev/mailers" });
  res.end();
  return { props: {} };
};
