import prisma from "../../prisma";
import type { Organization } from "../../prisma/generated/client";

// find or create the default list
export async function findOrCreateDefaultList(org?: Organization | null) {
  let defaultList = await prisma.list.findFirst({
    where: {
      isDefault: true,
    },
  });

  if (!defaultList) {
    const organization = org || (await prisma.organization.findFirst());
    if (!organization) throw new Error("No organization found");

    defaultList = await prisma.list.create({
      data: {
        name: "default",
        displayName: "Default",
        organizationId: organization.id,
        isDefault: true,
      },
    });
  }

  return defaultList;
}
