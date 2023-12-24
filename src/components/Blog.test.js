import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "jest",
    author: "Dokimi",
    url: "http://example.com",
    likes: 500,
  };

  const update = jest.fn();
  const remove = jest.fn();

  test("renders title and author by default", async () => {
    render(<Blog blog={blog} update={update} remove={remove} />);

    const element = screen.getByTestId("default-render");
    expect(element).not.toHaveStyle("display: none");

    const clickEle = screen.getByTestId("click-render");
    expect(clickEle).toHaveStyle("display: none");
  });
});
