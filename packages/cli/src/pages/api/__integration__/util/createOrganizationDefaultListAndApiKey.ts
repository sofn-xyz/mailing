import prisma from "../../../../../prisma";

export async function createOrganizationDefaultListAndApiKey() {
  const organization = await prisma.organization.create({
    data: {
      name: "My Test Co " + Math.random(),
    },
  });

  const apiKey = await prisma.apiKey.create({
    data: {
      organizationId: organization.id,
    },
  });

  const defaultList = await prisma.list.create({
    data: {
      organizationId: organization.id,
      isDefault: true,
      displayName: "Default",
      name: "default",
    },
  });

  return {
    apiKey,
    organization,
    defaultList,
  };
}
