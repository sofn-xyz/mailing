import FormError from "../components/FormError";
import type { NextPage } from "next";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

const Signup: NextPage = () => {
  const [errors, setErrors] = useState();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  // client should provide the url to the installed cli's /api/oauth/callback route
  // otherwise take them to /settings for now
  let { redirectTo } = router.query;
  redirectTo = redirectTo || "/settings";

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (201 === response.status) {
        // success!
        const { code } = await response.json();
        window.location.href = `${redirectTo}?code=${code}`;
      } else {
        const json = await response.json();
        setErrors(json.error);
      }
    },
    [redirectTo]
  );

  return (
    <>
      <div>
        <div className="w-full h-full">
          <main className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <div className="grid grid-cols-3 gap-3">
              <h1 className="col-span-3 text-4xl sm:text-7xl 2xl:text-8xl m-0">
                Signup
              </h1>

              <FormError>{errors}</FormError>

              <form
                action="/api/users"
                method="POST"
                className="col-span-1"
                onSubmit={onSubmit}
              >
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-[8px] px-[12px]"
                    placeholder="you@email.com"
                    ref={emailRef}
                  />
                </div>
                <div className="mt-[12px]">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-[8px] px-[12px]"
                    ref={passwordRef}
                  />
                </div>
                <div className="mt-[12px]">
                  <button className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Save
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

export default Signup;
