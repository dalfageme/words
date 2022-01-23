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
    name: "Letra 1 de palabra 1: vacía",
  });
  expect(letter).toBeInTheDocument(6);
});

it("keyboard types on grid", async () => {
  wrap(App).atPath("/").mount();

  const row = screen.getByRole("row", { name: "Palabra 1 vacía" });
  const letter = within(row).getByRole("cell", {
    name: "Letra 1 de palabra 1: vacía",
  });
  typeKeyboardLetter("a");

  expect(letter).toHaveTextContent("a");
  expect(letter).toHaveAccessibleName("Letra 1 de palabra 1: a");
});

it("mark letter in gray if is not present in the correct word", async () => {
  wrap(App).atPath("/").mount();

  typeKeyboardLetter("a");
  typeKeyboardLetter("m");
  typeKeyboardLetter("e");
  typeKeyboardLetter("n");
  typeKeyboardLetter("o");
  enter();
  const row = screen.getByRole("row", { name: "Palabra 1: ameno" });
  const letter = within(row).getByRole("cell", {
    name: "La letra a no está en la palabra",
  });

  expect(letter).toHaveClass("letter--not-present");
});

function enter() {
  typeKeyboardLetter("< enter");
}

function typeKeyboardLetter(letter) {
  userEvent.click(getKeyboardKey(letter));
}

function getKeyboardKey(letter) {
  return within(document.querySelector(".react-simple-keyboard")).getByText(
    letter
  );
}
