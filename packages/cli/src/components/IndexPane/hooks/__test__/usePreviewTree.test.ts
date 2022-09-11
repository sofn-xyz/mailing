/**
 * @jest-environment jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { usePreviewTree } from "../usePreviewTree";

describe("usePreviewTree", () => {
  const previews: [string, string[]][] = [
    ["AccountCreated", ["accountCreated"]],
    ["NewSignIn", ["newSignIn"]],
    [
      "Reservation",
      ["reservationCanceled", "reservationChanged", "reservationConfirmed"],
    ],
    ["ResetPassword", ["resetPassword"]],
  ];

  it("sets routes and cursor from previews", () => {
    const { result } = renderHook(() => usePreviewTree(previews));
    const { cursor, treeRoutes } = result.current;
    expect(cursor).toBe(0);
    expect(treeRoutes).toMatchSnapshot();
  });

  it("navigates up down left right", () => {
    const { result } = renderHook(() => usePreviewTree(previews));
    act(result.current.up);
    expect(result.current.cursor).toBe(10);
    expect(result.current.treeRoutes![0].collapsed).toBe(false);

    act(result.current.down);
    expect(result.current.cursor).toBe(0);
    expect(result.current.treeRoutes![0].collapsed).toBe(false);

    act(result.current.left);
    expect(result.current.cursor).toBe(0);
    expect(result.current.treeRoutes![0].collapsed).toBe(true);

    act(result.current.right);
    expect(result.current.cursor).toBe(0);
    expect(result.current.treeRoutes![0].collapsed).toBe(false);
  });

  it("navigates left left left", () => {
    const { result } = renderHook(() => usePreviewTree(previews));

    act(result.current.left);
    act(result.current.left);
    act(result.current.left);

    const { cursor, treeRoutes } = result.current;
    expect(cursor).toBe(0);
    expect(treeRoutes![0].collapsed).toBe(true);
  });

  it("navigates right right right", () => {
    const { result } = renderHook(() => usePreviewTree(previews));

    act(result.current.right);
    act(result.current.right);
    act(result.current.right);

    const { cursor, treeRoutes } = result.current;
    expect(cursor).toBe(0);
    expect(treeRoutes![0].collapsed).toBe(false);
  });

  it("navigates down left down", () => {
    const { result } = renderHook(() => usePreviewTree(previews));

    act(result.current.down);
    act(result.current.left);
    act(result.current.down);

    const { cursor, treeRoutes } = result.current;
    expect(cursor).toBe(3);
    expect(treeRoutes![1].collapsed).toBe(true);
    expect(treeRoutes![3].collapsed).toBe(false);
  });
});
