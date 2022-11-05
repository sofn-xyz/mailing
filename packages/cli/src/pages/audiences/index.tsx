import React from "react";
import { NextPage } from "next";
import { withSessionSsr } from "../../util/session";
import prisma from "../../../prisma";
import type { Member, User } from "../../../prisma/generated/client";
import OutlineButton from "../components/ui/OutlineButton";

const PAGE_SIZE = 20;

type AudiencesProps = {
  members: Member[];
  page: number;
  total: number;
  defaultListId: string;
  user: User;
};

export const getServerSideProps = withSessionSsr<{ user: any }>(
  async function ({ req, query }) {
    const user = req.session.user;
    const page = "string" === typeof query.page ? parseInt(query.page, 10) : 0;

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const membersQuery = prisma.member.findMany({
      where: {
        List: {
          isDefault: true,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: PAGE_SIZE * page,
      take: PAGE_SIZE,
    });

    const totalQuery = prisma.member.count({
      where: {
        List: {
          isDefault: true,
        },
      },
    });

    const [total, members] = await Promise.all([totalQuery, membersQuery]);

    // No members, go back to page 0
    if (members.length === 0 && page > 0) {
      return {
        redirect: {
          destination: "/audiences",
          permanent: false,
        },
      };
    }

    let defaultListId: string | undefined = members[0]?.listId;
    if (!defaultListId) {
      // no members, so find the default list
      defaultListId = (
        await prisma.list.findFirst({
          where: {
            isDefault: true,
          },
        })
      )?.id;

      // create the default list if it doesn't exist
      if (!defaultListId) {
        const org = await prisma.organization.findFirst({});
        if (!org) {
          throw new Error("No organization found");
        }
        const defaultList = await prisma.list.create({
          data: {
            organizationId: org.id,
            name: "Default",
            isDefault: true,
          },
        });
        defaultListId = defaultList.id;
      }
    }

    const props: AudiencesProps = {
      user,
      members: JSON.parse(JSON.stringify(members)),
      total,
      page,
      defaultListId,
    };

    return {
      props,
    };
  }
);

const PreviewIndex: NextPage<AudiencesProps> = ({
  members,
  total,
  defaultListId,
}) => {
  return (
    <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3">
      <div className="mt-16 col-span-3"></div>
      <h2 className="col-span-2 text-3xl font-bold">
        Audience{" "}
        <sup className="font-normal text-sm relative -top-3">{total}</sup>
      </h2>
      <div className="col-span-1 text-right">
        <OutlineButton
          text="Add subscriber"
          type="button"
          href={`/lists/${defaultListId}/subscribe`}
        />
      </div>
      <div className="col-span-3">
        <table className="table-auto w-full">
          <thead className="text-xs uppercase text-gray-500 border-t border-slate-300">
            <tr>
              <td>Email Address</td>
              <td>Date Added</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={`apikey${m.id}`} className="divide-y-1 divide-[#555]">
                <td className="py-[7px]">{m.email}</td>
                <td>{new Date(m.createdAt).toLocaleString()}</td>
                <td>
                  <a href={`/unsubscribe/${m.id}`}>Preferences</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviewIndex;
