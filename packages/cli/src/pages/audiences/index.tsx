import React from "react";
import { NextPage } from "next";
import { withSessionSsr } from "../../util/session";
import prisma from "../../../prisma";
import type { Member, User } from "../../../prisma/generated/client";

const PAGE_SIZE = 20;

type AudiencesProps = {
  members: Member[];
  page: number;
  total: number;
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

    const props: AudiencesProps = {
      user,
      members: JSON.parse(JSON.stringify(members)),
      total,
      page,
    };

    return {
      props,
    };
  }
);

const PreviewIndex: NextPage<AudiencesProps> = ({ members, total }) => {
  return (
    <div>
      <div className="mt-16 col-span-3"></div>
      <h2 className="col-span-2 text-3xl font-bold">
        Audience<span>{total}</span>
      </h2>

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
