import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { configure } from "wrapito";

configure({
  mount: render,
});
