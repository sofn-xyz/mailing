import { withSessionSsr } from "../util/session";
import { ReactElement, useCallback, useEffect, useState } from "react";
import prisma from "../../prisma";
import type { ApiKey, List, User } from "../../prisma/generated/client";
import OutlineButton from "../components/ui/OutlineButton";
import Table from "../components/ui/Table";
import Link from "next/link";

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
      select: { id: true, active: true, createdAt: true },
    });

    const lists: List[] = await prisma.list.findMany({
      where: { organizationId: user.organizationId },
    });

    return {
      props: {
        user: req.session.user,
        apiKeys: JSON.parse(JSON.stringify(apiKeys)),
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

const API_TABLE_HEADERS: (ReactElement | string)[] = [
  "API Key",
  "Active",
  "Date created",
];
const LIST_TABLE_HEADERS: (ReactElement | string)[] = [
  "Name",
  "Display name",
  "",
];

function Settings(props: Props) {
  const [apiKeys, setApiKeys] = useState(props.apiKeys);
  const [apiKeyRows, setApiKeyRows] = useState<string[][]>([]);
  const { lists } = props;

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

  useEffect(() => {
    setApiKeyRows(
      apiKeys.map((apiKey) => [
        apiKey.id,
        JSON.stringify(apiKey.active),
        apiKey.createdAt ? new Date(apiKey.createdAt).toLocaleString() : "",
      ])
    );
  }, [apiKeys]);

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
              <div id="api-keys" className="col-span-3">
                <Table rows={[API_TABLE_HEADERS].concat(apiKeyRows)} />
              </div>
            </div>
            <hr className="my-16 border-dotted border-gray-500 border-top border-bottom-0" />
            <div className="px-8 max-w-2xl mx-auto">
              <div className="flex mb-8">
                <h2 className="grow inline-flex text-3xl font-bold">Lists</h2>
              </div>
              <div className="col-span-3">
                <Table
                  rows={[LIST_TABLE_HEADERS].concat(
                    lists.map((list) => [
                      list.name,
                      list.displayName,
                      <Link
                        key={list.id}
                        href={`/lists/${list.id}/subscribe`}
                        legacyBehavior
                      >
                        <a>Subscribe</a>
                      </Link>,
                    ])
                  )}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Settings;
