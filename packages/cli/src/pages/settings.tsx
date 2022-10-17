import { withSessionSsr } from "../util/session";
import { useState } from "react";
import prisma from "../../prisma";
import { ApiKey, User } from "../../prisma/generated/client";

export const getServerSideProps = withSessionSsr<{ user: any }>(
  async function ({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const apiKeys: ApiKey[] = await prisma.apiKey.findMany({
      where: { organizationId: user.organizationId },
    });

    return {
      props: {
        user: req.session.user,
        apiKeys,
      },
    };
  }
);

function Settings(props: { user: User; apiKeys: ApiKey[] }) {
  const [apiKeys, setApiKeys] = useState(props.apiKeys);

  const createApiKey = async () => {
    const response = await fetch("/api/apiKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    setApiKeys(apiKeys.concat(json.apiKey));
  };

  const deleteApiKey = (apiKey: string) => {
    return () => {
      console.log(apiKey);
      // fetch delete api with apiKey;
      // setApiKeys
    };
  };

  return (
    <>
      <div>
        <div className="w-full h-full">
          <main className="max-w-3xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <div className="grid grid-cols-3 gap-3">
              <h1 className="col-span-3 text-4xl sm:text-7xl 2xl:text-8xl m-0">
                Settings
              </h1>

              <div className="col-span-3">
                <p>Welcome back {props.user?.email}</p>
              </div>

              <div className="mt-16 col-span-3"></div>
              <h2 className="col-span-2 text-3xl">API Keys</h2>
              <div className="col-span-1 text-right">
                <button
                  onClick={createApiKey}
                  className="text-sm text-green-300 border-emerald-700 border-[1px] rounded-lg p-[13px]"
                >
                  New API Key
                </button>
              </div>
              <div className="col-span-3">
                <table className="table-auto w-full">
                  <thead className="text-xs uppercase text-gray-500 border-t-[1px] border-slate-300">
                    <tr>
                      <td>API Key</td>
                      <td>Date Added</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((apiKey) => (
                      <tr
                        key={`apikey${apiKey.id}`}
                        className="divide-y-1 divide-[#555]"
                      >
                        <td className="py-[7px]">{apiKey.id}</td>
                        <td>{apiKey.createdAt?.toString()}</td>
                        <td>
                          <a
                            className="text-sm text-red-400 cursor-pointer"
                            onClick={deleteApiKey(apiKey.id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Settings;
