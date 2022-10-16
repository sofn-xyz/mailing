import React from "react";
import { setup } from "../../util/__test__/testUtils";
import Intercept from "../Intercept";

describe("Intercept", () => {
  const data: Intercept = {
    id: "intercept-id",
    html: "<html></html>",
    to: "peter@campsh.com",
  };

  describe("safe force deliver", () => {
    let confirmSpy: jest.SpyInstance<boolean, [message?: string | undefined]>;
    beforeAll(() => {
      confirmSpy = jest.spyOn(window, "confirm");
      confirmSpy.mockImplementation(jest.fn(() => false));
    });
    afterAll(() => confirmSpy.mockRestore());

    it("count is correct", async () => {
      const { findByText, user } = setup(<Intercept data={data} />);
      const button = await findByText("Force Deliver");
      await user.click(button);
      expect(confirmSpy).toHaveBeenCalledWith(
        "This email will be sent to 1 person.\nAre you sure you want to deliver?"
      );
    });

    it("count is correct with cc", async () => {
      const { findByText, user } = setup(
        <Intercept data={{ ...data, cc: ["james", "mark"] }} />
      );
      const button = await findByText("Force Deliver");
      await user.click(button);
      expect(confirmSpy).toHaveBeenCalledWith(
        "This email will be sent to 3 people.\nAre you sure you want to deliver?"
      );
    });

    it("count is correct with bcc", async () => {
      const { findByText, user } = setup(
        <Intercept data={{ ...data, bcc: ["jim@ok.com"] }} />
      );
      const button = await findByText("Force Deliver");
      await user.click(button);
      expect(confirmSpy).toHaveBeenCalledWith(
        "This email will be sent to 2 people.\nAre you sure you want to deliver?"
      );
    });
  });
});
