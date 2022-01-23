import { screen } from "@testing-library/react";
import { wrap } from "wrapito";
import App from "./App";

test("renders learn react link", async () => {
  wrap(App).atPath("/").mount();
  const linkElement = await screen.findByText(/learn react/i);

  expect(linkElement).toBeInTheDocument();
});
