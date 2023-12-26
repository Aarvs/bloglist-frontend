import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Create from "./createNew";

test("the create blog form calls the CreateBlog event handler", () => {
  const createBlog = jest.fn();
  render(<Create createBlog={createBlog} />);

  fireEvent.click(screen.getByText("Create Blog"));

  expect(createBlog.mock.calls).toHaveLength(1);
});
