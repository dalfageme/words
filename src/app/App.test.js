import { screen } from "@testing-library/react";
import { wrap } from "wrapito";
import App from "./App";

it("has a virtual keyboard", async () => {
  wrap(App).atPath("/").mount();

  expect(await screen.findByText("q")).toBeInTheDocument();
  expect(screen.getByText("w")).toBeInTheDocument();
  expect(screen.getByText("e")).toBeInTheDocument();
  expect(screen.getByText("r")).toBeInTheDocument();
  expect(screen.getByText("t")).toBeInTheDocument();
  expect(screen.getByText("y")).toBeInTheDocument();
});
