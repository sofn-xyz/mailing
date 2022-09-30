import { withSession } from "../util";
import { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";

type ApiKey = {
  id: string;
};

type User = {
  email: string;
};

export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const apiKeys: ApiKey[] = await prisma.apiKey.findMany({
    where: { organizationId: user.organizationId },
    select: { id: true },
  });

  return {
    props: {
      user: req.session.user,
      apiKeys,
    },
  };
});

const Settings: NextPage = (props: { user: User; apiKeys: ApiKey[] }) => {
  const apiKeys = props.apiKeys;

  const createApiKey = async () => {
    await fetch("/api/apiKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <div>
        <div className="w-full h-full">
          <main className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <div className="grid grid-cols-3 gap-3">
              <h1 className="col-span-3 text-4xl sm:text-7xl 2xl:text-8xl m-0">
                Settings
              </h1>

              <div className="col-span-3">
                <p>Welcome back {props.user?.email}</p>

                <h2>API Keys</h2>
                <button onClick={createApiKey}>Create</button>
                <ul>
                  {apiKeys.map((apiKey) => (
                    <li key={`apikey${apiKey.id}`}>API Key {apiKey.id}</li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Settings;
