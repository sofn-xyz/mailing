import type { GetServerSideProps } from "next";
import { useCallback, useRef, useState } from "react";
import Input from "../../../components/ui/Input";
import OutlineButton from "src/components/ui/OutlineButton";
import prisma from "../../../../prisma";
import type { List } from "../../../../prisma/generated/client";
import FormError from "../../../components/FormError";

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
        props: { list: JSON.parse(JSON.stringify(list)) },
      }
    : {
        notFound: true,
      };
};

type Props = {
  list: List;
};

const Submitted = () => (
  <div className="col-span-3">Thanks for subscribing!</div>
);

const Subscribe = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string | undefined>();

  const { list } = props;

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await fetch(`/api/lists/${list.id}/subscribe`, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current?.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if ([200, 201].includes(response.status)) {
        setSubmitted(true);
      } else {
        try {
          const json = await response.json();
          setErrors(json.error);
        } catch {
          setErrors("Something went wrong");
        }
      }
    },
    [list.id]
  );

  const SubscribeForm = useCallback(
    () => (
      <form className="col-span-3" onSubmit={onSubmit}>
        <div>
          <Input
            type="email"
            name="email"
            label="Email"
            id="email"
            placeholder="subscriber@email.com"
            ref={emailRef}
          />
        </div>
        <div className="flex justify-end mt-4">
          <OutlineButton text="Subscribe" type="submit" />
        </div>
      </form>
    ),
    [onSubmit]
  );

  return (
    <div>
      <div className="max-w-md mx-auto h-screen flex flex-col justify-center">
        <main className="pb-20 sm:pb-24 lg:pb-32 pt-10 sm:pt-20">
          <div className="grid grid-cols-3 gap-4">
            <h1 className="text-4xl font-bold text-white m-0 leading-tight col-span-3">
              {list.name === "Default"
                ? "Subscribe"
                : `Subscribe to "${list.name}"`}
            </h1>

            {errors ? <FormError>{errors}</FormError> : null}
            {submitted ? <Submitted /> : <SubscribeForm />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Subscribe;
