import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/index";
import { host } from "../../../util/mailingApi";

const throwError = (error) => {
  throw new Error(JSON.stringify(error));
};

const toJSON = (res) => res.json();

const requestGithubToken = async (credentials) => {
  console.log("credentials are", credentials);

  return fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

const requestGithubUserAccount = (token) =>
  fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(toJSON)
    .catch(throwError);

const authorizeWithMailing = async (credentials) => {
  const response = await requestGithubToken(credentials);

  if (response.status !== 200) {
    console.log(await response.json());
    throw new Error("github returned a non-200 status code");
  }

  const json = await response.json();

  // 200 response with json:
  // {
  //   access_token: 'xyz',
  //   token_type: 'bearer',
  //   scope: 'user'
  // }

  const access_token = json.access_token;

  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let code = req.query.code;

  // check db Config table for client_id, client_secret
  // if not, use code to fetch client_id, client_secret from mailing.run, write to DB
  // fetch includes new code
  let org = await prisma.Organization.findFirst();
  if (!org) {
    const response = await fetch(`${host}/api/oauth/client`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    code = json.code;
    org = {
      id: json.clientId,
      clientSecret: json.clientSecret,
    };
    await prisma.Organization.create({ data: org });
  }

  let opts = await authorizeWithMailing({
    client_id: org.id,
    client_secret: org.clientSecret,
    code,
  });

  console.log("from github", opts);

  res.status(200).json({ ok: true });
}
