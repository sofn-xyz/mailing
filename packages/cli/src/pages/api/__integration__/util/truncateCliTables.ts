import cliPrisma from "../../../../../prisma";

export const truncateCliTables = async (tables: string[]) => {
  const joinedTableNames = tables.map((t) => `"${t}"`).join(", ");

  const query = `TRUNCATE ${joinedTableNames} CASCADE;`;
  await cliPrisma.$executeRawUnsafe(query);
};
