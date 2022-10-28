import type { GetServerSideProps } from "next";
import { useCallback, useRef } from "react";
import prisma from "../../../../prisma";
import type { List } from "../../../../prisma/generated/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;

  if ("string" !== typeof id) {
    return {
      notFound: true,
    };
  }

  const list = await prisma.list.findUnique({ where: { id } });

  return list
    ? {
        props: { list },
      }
    : {
        notFound: true,
      };
};

type Props = {
  list: List;
};

const Subscribe = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);

  const { list } = props;

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(emailRef?.current?.value);
    e.preventDefault();

    // fetch POST form contents to /api/lists/[id]/subscribe
    //   const response = await fetch(`/api/lists/${list.id}/subscribe`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: emailRef.current?.value,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },);
  }, []);

  return (
    <>
      <div>
        <div className="w-full h-full">
          <main className="max-w-3xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <div className="grid grid-cols-3 gap-3">
              <h1 className="col-span-3 text-4xl sm:text-7xl m-0">
                Subscribe to {list.name}
              </h1>

              <form className="col-span-3" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 text-black"
                    placeholder="you@email.com"
                    ref={emailRef}
                  />
                </div>
                <div>
                  <button className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
