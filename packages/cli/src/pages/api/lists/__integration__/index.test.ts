import {
  apiCreateList,
  ApiCreateLists,
  apiGetLists,
} from "../../__integration__/util/lists";
import { apiLogin } from "../../__integration__/util/login";

describe("lists", () => {
  describe("not logged in", () => {
    it("GET /lists should 404", async () => {
      const { response } = await apiGetLists();
      expect(response.status).toBe(401);
    });
  });

  describe("logged in", () => {
    beforeAll(async () => {
      await apiLogin();
    });

    it("GET /lists should 200 with a blank array of lists", async () => {
      const { response } = await apiGetLists();
      expect(response.status).toBe(200);
      const data = await response.json();
      expect("lists" in data).toBe(true);
      expect(data.lists.length).toBe(0);
    });

    it("POST /lists should 201 and then GET /lists should 200 and include the list", async () => {
      const { formData, response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);

      const { response: getListsResponse } = await apiGetLists();
      expect(getListsResponse.status).toBe(200);
      const data = await getListsResponse.json();
      expect("lists" in data).toBe(true);
      expect(data.lists.length).toBe(1);

      const newList = data.lists[0];
      expect(Object.keys(newList)).toEqual(["id", "name", "organizationId"]);
      expect(newList.name).toBe(formData.name);
    });

    it("POST /lists should validate presence of name", async () => {
      const instance = new ApiCreateLists();
      instance.formData = {
        name: "",
      };
      const { response } = await instance.perform();
      expect(response.status).toBe(422);
    });
  });
});
