import Head from "next/head";
import prisma from "../../../prisma";
import { GetServerSideProps } from "next";
import type { List, Member } from "../../../prisma/generated/client";
import { useCallback, useState } from "react";
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

  const memberData: Member[] = await prisma.member.findMany({
    where: {
      email: listMember.email,
    },
  });

  const listIds = memberData.map((member: Member) => member.listId);

  // map listId to member.id for this member so we can tell the server which Member records to update
  const listMembers: { [key: string]: string } = {};

  for (const member of memberData) {
    listMembers[member.listId] = member.id;
  }

  const lists = await prisma.list.findMany({ where: { id: { in: listIds } } });

  const [defaultList] = remove(lists, (list: List) => list.isDefault);

  if (!defaultList) {
    throw new Error("Couldn't find default list");
  }

  const [defaultMember] = remove(
    memberData,
    (member) => member.listId === defaultList.id
  );

  if (!defaultMember) {
    throw new Error("Couldn't find membership for default list");
  }

  const initialFormState: FormState = memberData.reduce(
    (acc: FormState, member: Member) => {
      acc[member.listId] = {
        enabled: "subscribed" === defaultMember.status,
        checked: "subscribed" === member.status,
      } as ListState;

      return acc;
    },
    {
      [defaultList.id]: {
        checked: "unsubscribed" === defaultMember.status,
        enabled: true,
      },
    } as FormState
  );

  return {
    props: {
      memberId,
      lists: JSON.parse(JSON.stringify(lists)),
      listMembers: JSON.parse(JSON.stringify(listMembers)),
      defaultList: JSON.parse(JSON.stringify(defaultList)),
      defaultMember: JSON.parse(JSON.stringify(defaultMember)),
      initialFormState,
    },
  };
};

type UnsubscribeProps = {
  memberId: string;
  lists: List[];
  defaultList: List;
  initialFormState: FormState;
  defaultMember: Member;
  listMembers: { [key: string]: string };
};

type ListProps = {
  list: List;
  name?: string;
  data: ListState;
  onChange: () => void;
};

const List = (props: ListProps) => {
  const name = props.name || props.list.name;
  const id = `list-${props.list.id}`;
  return (
    <li className="list-none pb-4">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer"
        checked={props.data.checked}
        disabled={!props.data.enabled}
        onChange={props.onChange}
      />
      <label className="cursor-pointer pl-3" htmlFor={id}>
        {name}
      </label>
    </li>
  );
};

type PatchData = {
  [key: string]: {
    status: "subscribed" | "unsubscribed";
  };
};

const Unsubscribe = (props: UnsubscribeProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState<FormState>(props.initialFormState);
  const { lists, defaultList, defaultMember, memberId, listMembers } = props;

  function onChange(listId: string, isDefaultList: boolean) {
    return function () {
      let newFormState;

      if (isDefaultList) {
        // when checking the default list: disable all other lists and check the default list
        // when unchecking the default list: enable all lists and uncheck the default list
        newFormState = Object.keys(formState).reduce((acc: FormState, key) => {
          acc[key] = {
            enabled: formState[listId].checked ? true : key === listId,
            checked:
              key === listId
                ? !formState[listId].checked
                : formState[key].checked,
          } as ListState;

          return acc;
        }, {});
      } else {
        newFormState = {
          ...formState,
          [listId]: { checked: !formState[listId]["checked"], enabled: true },
        };
      }

      setFormState(newFormState);
    };
  }

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = Object.keys(formState).reduce((acc: PatchData, listId) => {
        const memberId = listMembers[listId];

        // the checkbox behavior is inverted for the default list
        acc[memberId] = {
          status:
            memberId === defaultMember.id
              ? formState[listId].checked
                ? "unsubscribed"
                : "subscribed"
              : formState[listId].checked
              ? "subscribed"
              : "unsubscribed",
        };

        return acc;
      }, {});

      // send json
      await fetch(`/api/unsubscribe/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      setFormSubmitted(true);
    },
    [formState, memberId, listMembers, defaultMember]
  );

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

                <div className="col-span-3">
                  {lists.length ? (
                    <>
                      <ul>
                        {lists.map((list) => (
                          <List
                            list={list}
                            key={list.id}
                            data={formState[list.id]}
                            onChange={onChange(list.id, false)}
                          />
                        ))}
                      </ul>
                    </>
                  ) : null}

                  <List
                    list={defaultList}
                    key={defaultList.id}
                    data={formState[defaultList.id]}
                    onChange={onChange(defaultList.id, true)}
                    name="Unsubscribe from all emails"
                  />
                </div>
              </div>
              <div className="col-span-3 border border-top border-gray-600 text-center">
                <button className="text-blue p-4 m-4">Save preferences</button>
              </div>
            </form>
            {formSubmitted ? (
              <div className="mt-8">
                <FormSuccess>Saved!</FormSuccess>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
