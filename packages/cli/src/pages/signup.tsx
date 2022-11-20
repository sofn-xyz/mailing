import FormError from "../components/FormError";
import type { NextPage } from "next";
import { useCallback, useRef, useState } from "react";
import prisma from "../../prisma";
import OutlineButton from "../components/ui/OutlineButton";
import Input from "../components/ui/Input";
import Link from "next/link";
import { withSessionSsr } from "../util/session";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const userCount = await prisma.user.count();

    return userCount
      ? user
        ? { redirect: { destination: "/settings", permanent: false } }
        : {
            notFound: true,
          }
      : { props: {} };
  }
);

const Signup: NextPage = () => {
  const [errors, setErrors] = useState();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const redirectTo = "/settings";

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

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
        window.location.href = redirectTo;
      } else {
        const json = await response.json();
        setErrors(json.error);
      }
    },
    [redirectTo]
  );

  return (
    <>
      <div className="max-w-md mx-auto h-screen flex flex-col justify-center">
        <main className="py-20 sm:py-24 lg:py-32">
          <h1 className="text-4xl font-bold text-white m-0 leading-tight">
            Sign up
          </h1>
          <p className="pt-2 pb-10 leading-tight">
            Already have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue hover:underline">Log in</a>
            </Link>
          </p>
          <FormError>{errors}</FormError>
          <form
            action="/api/users"
            method="POST"
            className="col-span-1"
            onSubmit={onSubmit}
          >
            <Input
              label="Email"
              placeholder="you@email.com"
              type="text"
              name="email"
              id="email"
              ref={emailRef}
            />
            <div className="mt-6" />
            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
            />
            <div className="mt-10 flex justify-end">
              <OutlineButton type="submit" text="Sign up" />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Signup;
