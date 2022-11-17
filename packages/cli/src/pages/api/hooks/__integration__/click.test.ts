import { apiHookClick } from "../../__integration__/util/hooks/click";
import prisma from "../../../../../prisma";

describe("api/hooks/click", () => {
  it("creates a click on first time", async () => {
    const message = await prisma.message.create({
      data: {
        to: "user@mailing.dev",
        from: "from@mailing.dev",
        subject: "Test Email",
        templateName: "Test",
      },
    });

    const { response } = await apiHookClick({ messageId: message.id });
    expect(response.status).toEqual(200);

    const click = await prisma.click.findFirst({
      where: {
        messageId: message.id,
        url: "http://localhost:3883",
      },
    });

    expect(click).toBeTruthy();
  });

  it("updates a click on subsequent times", async () => {
    const message = await prisma.message.create({
      data: {
        to: "user@mailing.dev",
        from: "from@mailing.dev",
        subject: "Test Email",
        templateName: "Test",
      },
    });
    const click = await prisma.click.create({
      data: {
        messageId: message.id,
        url: "http://localhost:3883",
      },
    });
    expect(click).toBeTruthy();
    const { response } = await apiHookClick({ messageId: message.id });
    expect(response.status).toEqual(200);

    const updatedClick = await prisma.click.findFirst({
      where: {
        messageId: message.id,
        url: "http://localhost:3883",
      },
    });

    expect(updatedClick).toBeTruthy();
    expect(updatedClick?.count).toEqual(2);
  });
});
