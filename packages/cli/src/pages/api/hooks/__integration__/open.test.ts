import { apiHookOpen } from "../../__integration__/util/hooks/open";
import prisma from "../../../../../prisma";

describe("api/hooks/open", () => {
  it("increments openCount", async () => {
    const message = await prisma.message.create({
      data: {
        to: "user@mailing.dev",
        from: "from@mailing.dev",
        subject: "Test Email",
        templateName: "Test",
      },
    });
    const { response } = await apiHookOpen({ messageId: message.id });
    expect(response.status).toEqual(200);

    const updatedMessage = await prisma.message.findUnique({
      where: { id: message.id },
    });
    expect(updatedMessage?.openCount).toEqual(1);
  });

  it("handles message missing", async () => {
    const { response } = await apiHookOpen();
    expect(response.status).toEqual(200);
  });
});
