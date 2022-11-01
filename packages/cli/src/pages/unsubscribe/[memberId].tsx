import Head from "next/head";
import prisma from "../../../prisma";
import { GetServerSideProps } from "next";
import type { List, Member } from "../../../prisma/generated/client";
import { useState } from "react";
import FormSuccess from "../components/FormSuccess";
import { remove } from "lodash";

type ListState = {
  enabled: boolean;
  checked: boolean;
};

type FormState = {
  [key: string]: ListState;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const memberId = context?.params?.memberId;

  if ("string" !== typeof memberId) {
    return { notFound: true };
  }

  const listMember = await prisma.member.findUnique({
    where: { id: memberId },
  });

  if (!listMember) {
    return {
      notFound: true,
    };
  }

  const listIds = (
    await prisma.member.findMany({
      where: {
        email: listMember.email,
      },
    })
  ).map((member: Member) => member.listId);

  const lists = await prisma.list.findMany({ where: { id: { in: listIds } } });

  const [defaultList] = remove(lists, (list: List) => list.isDefault);

  if (!defaultList) {
    throw new Error("Couldn't find default list");
  }

  const initialFormState: FormState = lists.reduce(
    (acc: FormState, list: List) => {
      acc[list.id] = {
        enabled: true,
        checked: true,
      } as ListState;

      return acc;
    },
    { [defaultList.id]: { enabled: true, checked: false } } as FormState
  );

  return {
    props: {
      memberId,
      lists,
      defaultList,
      initialFormState,
    },
  };
};

type Props = {
  memberId: string;
  lists: List[];
  defaultList: List;
  initialFormState: FormState;
};

type ListProps = { list: List; name?: string; data: ListState };

const List = (props: ListProps) => {
  const name = props.name || props.list.name;
  const id = `list-${props.list.id}`;
  return (
    <li className="list-none pb-4">
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={props.data.checked}
        disabled={!props.data.enabled}
      />
      <label className="cursor-pointer pl-3" htmlFor={id}>
        {name}
      </label>
    </li>
  );
};

const Unsubscribe = (props: Props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState<FormState>(props.initialFormState);
  const { lists, defaultList } = props;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div>
        <div className="w-full h-full">
          <main className="max-w-sm mx-auto pt-20 sm:pt-24 lg:pt-32">
            <form
              className="grid grid-cols-3 gap-3 border-solid border-gray-600 border rounded-2xl pt-12"
              onSubmit={onSubmit}
            >
              <div className="col-span-3 pr-12 pl-12">
                <h1 className="text-3xl sm:text-3xl 2xl:text-3xl m-0 mb-8">
                  Email preferences
                </h1>

                {formSubmitted ? <FormSuccess>Saved!</FormSuccess> : null}

                <div className="col-span-3">
                  {lists.length ? (
                    <>
                      <ul>
                        {lists.map((list) => (
                          <List
                            list={list}
                            key={list.id}
                            data={formState[list.id]}
                          />
                        ))}
                      </ul>
                    </>
                  ) : null}

                  <List
                    list={defaultList}
                    key={defaultList.id}
                    data={formState[defaultList.id]}
                    name="Unsubscribe from all emails"
                  />
                </div>
              </div>
              <div className="col-span-3 border border-top border-gray-600 text-center">
                <button className="text-blue p-4 m-4">Save preferences</button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
