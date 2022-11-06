import { withSessionSsr } from "../util/session";
import { useCallback, useState } from "react";
import prisma from "../../prisma";
import type { ApiKey, List, User } from "../../prisma/generated/client";
import OutlineButton from "./components/ui/OutlineButton";

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
        lists: JSON.parse(JSON.stringify(lists)),
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
  const { lists: initialLists } = props;
  const [lists, setLists] = useState(initialLists);

  const createApiKey = useCallback(async () => {
    const response = await fetch("/api/apiKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    setApiKeys(apiKeys.concat(json.apiKey));
  }, [apiKeys]);

  const createList = useCallback(async () => {
    const response = await fetch("/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `My List ${Math.random()}` }),
    });

    const json = await response.json();
    setLists(lists.concat(json.list));
  }, [lists]);

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
        <div className="w-full">
          <main className="py-16">
            <div className="px-8 max-w-2xl mx-auto">
              <h1 className="font-bold text-3xl mt-0 mb-8">Account</h1>
              <p className="block leading-none text-sm font-bold text-slate-400 mb-3">
                Email
              </p>
              {props.user?.email}
            </div>
            <hr className="my-16 border-dotted border-gray-500 border-top border-bottom-0" />
            <div className="px-8 max-w-2xl mx-auto ">
              <div className="mt-16 col-span-3" />
              <div className="flex mb-8">
                <h2 className="grow inline-flex text-3xl font-bold">
                  API Keys
                </h2>
                <div className="inline-flex text-right">
                  <OutlineButton
                    onClick={createApiKey}
                    small
                    text="New API Key"
                  />
                </div>
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
            </div>
            <hr className="my-16 border-dotted border-gray-500 border-top border-bottom-0" />
            <div className="px-8 max-w-2xl mx-auto ">
              <div className="flex mb-8">
                <h2 className="grow inline-flex text-3xl font-bold">Lists</h2>
                <div className="inline-flex text-right">
                  <OutlineButton onClick={createList} small text="New List" />
                </div>
              </div>
              <div className="col-span-3">
                <table className="table-auto w-full">
                  <thead className="text-xs uppercase text-gray-500 border-t border-slate-300">
                    <tr>
                      <td>Name</td>
                      <td>Id</td>
                      <td>Subscribe</td>
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
                        <td>
                          <a href={`/lists/${list.id}/subscribe`}>Subscribe</a>
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
