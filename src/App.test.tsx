import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderApp(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
}

describe("App", () => {
  it("renders hint text on home route", () => {
    renderApp("/");
    expect(
      screen.getByText(/Click an island to explore/i)
    ).toBeInTheDocument();
  });

  it("renders about page content", () => {
    renderApp("/about");
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to map/i })).toBeInTheDocument();
  });
});
