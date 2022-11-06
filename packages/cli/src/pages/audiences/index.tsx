import React, { ReactElement } from "react";
import { NextPage } from "next";
import { withSessionSsr } from "../../util/session";
import prisma from "../../../prisma";
import type { Member, User } from "../../../prisma/generated/client";
import OutlineButton from "../components/ui/OutlineButton";
import Table from "../components/ui/Table";
import Link from "next/link";
import PaginationControl from "../components/ui/PaginationControl";

const PAGE_SIZE = 20;

type AudiencesProps = {
  members: Member[];
  memberListCounts: { [key: string]: number };
  page: number;
  total: number;
  defaultListId: string;
  user: User;
  sortOrder: "desc" | "asc";
};

export const getServerSideProps = withSessionSsr<{ user: any }>(
  async function ({ req, query }) {
    const user = req.session.user;
    const page = "string" === typeof query.page ? parseInt(query.page, 10) : 0;
    const sortOrder = "string" === typeof query.sortOrder ? "asc" : "desc";

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
        createdAt: sortOrder,
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

    const memberListCounts = (
      await prisma.member.groupBy({
        by: ["email"],
        _count: {
          email: true,
        },
        where: {
          email: { in: members.map((member) => member.email) },
        },
      })
    ).map((member) => [member.email, member._count.email]);

    const props: AudiencesProps = {
      user,
      members: JSON.parse(JSON.stringify(members)),
      memberListCounts: Object.fromEntries(memberListCounts),
      total,
      page,
      defaultListId,
      sortOrder,
    };

    return {
      props,
    };
  }
);

const PreviewIndex: NextPage<AudiencesProps> = ({
  members,
  memberListCounts,
  total,
  defaultListId,
  sortOrder,
  page,
}) => {
  const headers: (ReactElement | string)[] = [
    "Email",
    <Link
      key="header"
      href={`/audiences${sortOrder === "desc" ? "?sortOrder=asc" : ""}`}
    >
      <a>Added</a>
    </Link>,
    "Lists",
  ];

  const rows = members.map((m) => [
    m.email,
    new Date(m.createdAt).toLocaleString(),
    <Link key={m.id} href={`/unsubscribe/${m.id}`}>
      <a>{memberListCounts[m.email]}</a>
    </Link>,
  ]);

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3">
      <div className="mt-16 col-span-3"></div>
      <div className="col-span-3">
        <h2 className="inline-block text-3xl font-bold relative">
          Audience{" "}
          <sup className="font-normal text-sm top-0 absolute -right-6">
            {total}
          </sup>
        </h2>
        <div className="text-right float-right relative top-1">
          <OutlineButton
            text="Add subscriber"
            href={`/lists/${defaultListId}/subscribe`}
            small
          />
        </div>
      </div>
      <div className="col-span-3 hidden:sm">
        <Table rows={[headers].concat(rows)} />
      </div>
      <div className="col-span-3 hidden sm:visible">
        <Table rows={[headers].concat(rows)} />
      </div>
      <div className="col-span-3 mb-20">
        <PaginationControl page={page} total={total} pageSize={PAGE_SIZE} />
      </div>
    </div>
  );
};

export default PreviewIndex;
