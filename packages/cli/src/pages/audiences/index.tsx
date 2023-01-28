import React, { ReactElement, useEffect, useState } from "react";
import { NextPage } from "next";
import { withSessionSsr } from "../../util/session";
import prisma from "../../../prisma";
import type { Member, User } from "../../../prisma/generated/client";
import OutlineButton from "../../components/ui/OutlineButton";
import Table from "../../components/ui/Table";
import Link from "next/link";
import PaginationControl from "../../components/ui/PaginationControl";
import { findOrCreateDefaultList } from "../../util/lists";

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
    const page =
      "string" === typeof query.page
        ? Math.max(parseInt(query.page, 10), 1)
        : 1;
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
      skip: PAGE_SIZE * (page - 1),
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

    // No members, go back to page 1
    if (members.length === 0 && page > 1) {
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
      defaultListId = (await findOrCreateDefaultList()).id;
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
  const [rows, setRows] = useState<(ReactElement | string)[][]>([]);
  const headers: (ReactElement | string)[] = [
    "Email",
    <Link
      key="header"
      href={`/audiences${sortOrder === "desc" ? "?sortOrder=asc" : ""}`}
      legacyBehavior
    >
      <a>Added</a>
    </Link>,
    "Lists",
  ];

  useEffect(() => {
    setRows(
      members.map((m) => [
        m.email,
        m.createdAt.toLocaleString(),
        <Link key={m.id} href={`/unsubscribe/${m.id}`} legacyBehavior>
          <a>{memberListCounts[m.email]}</a>
        </Link>,
      ])
    );
  }, [members, memberListCounts]);

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-3">
      <div className="mt-16 col-span-3"></div>
      <div className="col-span-3">
        <h2 className="inline-block text-3xl font-bold relative mb-8">
          Audience{" "}
          <sup className="font-normal text-sm top-0 absolute -right-6">
            {total}
          </sup>
        </h2>
        <div className="text-right float-right relative">
          <OutlineButton
            small
            text="Add subscriber"
            href={`/lists/${defaultListId}/subscribe`}
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
