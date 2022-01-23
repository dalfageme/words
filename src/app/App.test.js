import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "wrapito";
import App from "./App";

it("has a virtual keyboard", async () => {
  wrap(App).atPath("/").mount();

  expect(getKeyboardKey("w")).toBeInTheDocument();
  expect(getKeyboardKey("e")).toBeInTheDocument();
  expect(getKeyboardKey("r")).toBeInTheDocument();
  expect(getKeyboardKey("t")).toBeInTheDocument();
  expect(getKeyboardKey("y")).toBeInTheDocument();
});

it("has a words grid", async () => {
  wrap(App).atPath("/").mount();

  expect(
    screen.getByRole("row", { name: "Palabra 1 vacía" })
  ).toBeInTheDocument();
});

it("display boxes for each letter", () => {
  wrap(App).atPath("/").mount();

  const row = screen.getByRole("row", { name: "Palabra 1 vacía" });
  const letter = within(row).getByRole("cell", {
    name: "Letra 1 de palabra 1 vacía",
  });
  expect(letter).toBeInTheDocument(6);
});

function getKeyboardKey(letter) {
  return within(document.querySelector(".react-simple-keyboard")).getByText(
    letter
  );
}
