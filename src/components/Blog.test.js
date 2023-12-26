import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
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

  test("renders title and author by default", () => {
    render(<Blog blog={blog} update={update} remove={remove} />);

    const beforeElement = screen.getByTestId("default-render");
    expect(beforeElement).not.toHaveStyle("display: none");

    const beforeClick = screen.getByTestId("click-render");
    expect(beforeClick).toHaveStyle("display: none");
  });

  test("includes url and likes after clicking the View Details button", async () => {
    render(<Blog blog={blog} update={update} remove={remove} />);

    const beforeElement = screen.getByTestId("default-render");
    expect(beforeElement).not.toHaveStyle("display: none");

    const beforeClick = screen.getByTestId("click-render");
    expect(beforeClick).toHaveStyle("display: none");

    const user = userEvent.setup();
    const button = screen.getByText("View Details");
    await user.click(button);

    // fireEvent.click(screen.getByText("View Details"));

    const afterElement = screen.getByTestId("default-render");
    expect(afterElement).toHaveStyle("display: none");

    const afterClick = screen.getByTestId("click-render");
    expect(afterClick).not.toHaveStyle("display: none");
  });

  test("when like button is clicked twice the update event handler must called twice", async () => {
    render(<Blog blog={blog} update={update} remove={remove} />);
    fireEvent.click(screen.getByText("View Details"));

    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(update.mock.calls).toHaveLength(2);
  });
});
