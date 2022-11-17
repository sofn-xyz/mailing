import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import FormError from "../components/FormError";
import OutlineButton from "../components/ui/OutlineButton";
import Input from "../components/ui/Input";

const Login: NextPage = () => {
  const [errors, setErrors] = useState();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (201 === response.status) {
      window.location.href = "/settings";
    } else {
      const json = await response.json();
      setErrors(json.error);
    }
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto h-screen flex flex-col justify-center">
        <main className="py-20 sm:py-24 lg:py-32">
          <h1 className="text-4xl font-bold text-white m-0 leading-tight">
            Log in
          </h1>
          <p className="pt-2 pb-10 leading-tight">
            Need an account?{" "}
            <Link href="/signup" legacyBehavior>
              <a className="text-blue hover:underline">Sign up</a>
            </Link>
          </p>
          <FormError>{errors}</FormError>
          <form action="/api/session" method="POST" onSubmit={onSubmit}>
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
              <OutlineButton type="submit" text="Log in" />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Login;
