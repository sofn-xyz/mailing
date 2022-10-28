// import { apiLogin } from "../../../__integration__/util/login";
// import { apiCreateList } from "../../../__integration__/util/lists";
// import {
//   apiGetListMembers,
//   apiCreateListMember,
// } from "../../../__integration__/util/listMember";
// import { apiLogout } from "../../../__integration__/util/logout";

// describe("lists/[id]/subscribe", () => {
//   let listId: string | undefined;

//   beforeAll(async () => {
//     await apiLogin();

//     // create list
//     const { response: createListResponse } = await apiCreateList();
//     expect(createListResponse.status).toBe(201);
//     const data = await createListResponse.json();

//     listId = data.list.id;
//     expect(typeof listId).toBe("string");

//     await apiLogout();
//   });

//   it("subscribes an email to a list", async () => {
//     // // create a list member
//     // const { response: createListMemberResponse } = await apiCreateListMember(
//     //   listId
//     // );
//     // expect(createListMemberResponse.status).toBe(201);
//     // // get list members
//     // const { response: listMembersResponse } = await apiGetListMembers(listId);
//     // expect(listMembersResponse.status).toBe(200);
//   });

//   it("should 422 when trying to subscribe with an invalid email", async () => {
//     // const { response: createListMemberResponse } = await apiCreateListMember(
//     //   listId,
//     //   {
//     //     email: "",
//     //     status: "subscribed",
//     //   }
//     // );
//     // expect(createListMemberResponse.status).toBe(422);
//   });

//   it("should be a noop for an existing email that is already subscribed", async () => {
//     // const { response: createListMemberResponse } = await apiCreateListMember(
//     //   listId,
//     //   {
//     //     email: "alex.farrill@gmail.com",
//     //     status: "made-this-up",
//     //   }
//     // );
//     // expect(createListMemberResponse.status).toBe(422);
//   });

//   it("should update an existing email that is unsubscribed to subscribed", async () => {
//     // const { response: createListMemberResponse } = await apiCreateListMember(
//     //   listId,
//     //   {
//     //     email: "alex.farrill@gmail.com",
//     //     status: "made-this-up",
//     //   }
//     // );
//     // expect(createListMemberResponse.status).toBe(422);
//   });

//   it("should be a noop for an existing email that is cleaned", async () => {
//     // const { response: createListMemberResponse } = await apiCreateListMember(
//     //   listId,
//     //   {
//     //     email: "alex.farrill@gmail.com",
//     //     status: "made-this-up",
//     //   }
//     // );
//     // expect(createListMemberResponse.status).toBe(422);
//   });
// });
