import type { NextApiRequest, NextApiResponse } from "next";

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

const authorizeWithGithub = async (credentials) => {
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
  const code = req.query.code;

  let opts = await authorizeWithGithub({
    client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
    client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    code,
  });

  console.log("from github", opts);

  res.status(200).json({ ok: true });
}
