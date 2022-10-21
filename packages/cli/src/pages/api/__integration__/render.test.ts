import { ApiRender, apiRender } from "./util/render";

describe("render", () => {
  it("GET should 200", async () => {
    const instance = new ApiRender();
    instance.method = "GET";
    instance.formData = {
      templateName: "AccountCreated",
      props: "%7B%22name%22%3A%22Alex%22%7D",
    };

    const { response } = await instance.perform();

    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.html).toBeDefined;
    expect(data.html).toMatch(/Alex, your table awaits/);
  });

  it("POST should 200", async () => {
    const { response } = await apiRender();
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.html).toBeDefined;
    expect(data.html).toMatch(/Alex, your table awaits/);
  });
});
