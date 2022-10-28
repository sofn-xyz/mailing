import { withSessionSsr } from "../util/session";
import { useState } from "react";
import prisma from "../../prisma";
import type { ApiKey, List, User } from "../../prisma/generated/client";

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

    const apiKeys = await prisma.apiKey.findMany({
      where: { organizationId: user.organizationId },
      select: { id: true, active: true },
    });

    const lists: List[] = await prisma.list.findMany({
      where: { organizationId: user.organizationId },
    });

    return {
      props: {
        user: req.session.user,
        apiKeys,
        lists,
      },
    };
  }
);

interface Props {
  user: User;
  apiKeys: ApiKey[];
  lists: List[];
}

function Settings(props: Props) {
  const [apiKeys, setApiKeys] = useState(props.apiKeys);
  const { lists } = props;

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
                  className="text-sm text-green-300 border-emerald-700 border rounded-lg p-[13px]"
                >
                  New API Key
                </button>
              </div>
              <div className="col-span-3">
                <table id="api-keys" className="table-auto w-full">
                  <thead className="text-xs uppercase text-gray-500 border-t border-slate-300">
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

              <div className="mt-16 col-span-3"></div>
              <h2 className="col-span-2 text-3xl">Lists</h2>
              <div className="col-span-3">
                <table className="table-auto w-full">
                  <thead className="text-xs uppercase text-gray-500 border-t border-slate-300">
                    <tr>
                      <td>Name</td>
                      <td>Id</td>
                    </tr>
                  </thead>
                  <tbody>
                    {lists.map((list) => (
                      <tr
                        key={`apikey${list.id}`}
                        className="divide-y-1 divide-[#555]"
                      >
                        <td className="py-[7px]">{list.name}</td>
                        <td>{list.id}</td>
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
