import prisma from "../../prisma";
import type { Organization } from "../../prisma/generated/client";

// find or create the default list
export async function findOrCreateDefaultList(org?: Organization | null) {
  let organization = org;

  let defaultList = await prisma.list.findFirst({
    where: {
      isDefault: true,
    },
  });

  if (!defaultList) {
    if (!organization) {
      organization = await prisma.organization.findFirst({});
    }
    if (!organization) {
      throw new Error("No organization found");
    }

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
