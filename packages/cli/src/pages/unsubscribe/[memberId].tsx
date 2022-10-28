import Head from "next/head";
import prisma from "../../../prisma";
import { GetServerSideProps } from "next";
import SubmitButton from "../../components/SubmitButton";
import type { List, Member } from "../../../prisma/generated/client";
import { useState } from "react";
import FormSuccess from "../components/FormSuccess";
import { remove } from "lodash";

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

  return {
    props: {
      memberId,
      lists,
      defaultList,
    },
  };
};

type Props = {
  memberId: string;
  lists: List[];
  defaultList: List;
};

const List = (props: { list: List; name?: string }) => {
  const name = props.name || props.list.name;
  return (
    <li className="list-none">
      <input type="checkbox" />
      <label>{name}</label>
    </li>
  );
};

const Unsubscribe = (props: Props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
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
          <main className="max-w-3xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <form className="grid grid-cols-3 gap-3" onSubmit={onSubmit}>
              <h1 className="col-span-3 text-4xl sm:text-7xl 2xl:text-8xl m-0">
                Unsubscribe
              </h1>

              {formSubmitted ? <FormSuccess>Saved!</FormSuccess> : null}

              <div className="col-span-3">
                {lists.length ? (
                  <>
                    <h2 className="col-span-2 text-3xl">Lists</h2>
                    <ul>
                      {lists.map((list) => (
                        <List list={list} key={list.id} />
                      ))}
                    </ul>
                  </>
                ) : null}

                <h2 className="col-span-2 text-3xl">Unsubscribe from all</h2>
                <List
                  list={defaultList}
                  key={defaultList.id}
                  name="Unsubscribe from all"
                />

                <div>
                  <SubmitButton>Submit</SubmitButton>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
