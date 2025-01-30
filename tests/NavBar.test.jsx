import { beforeEach, describe, expect, it } from "vitest";
import NavBar from "../src/components/Nav Bar/NavBar";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("NavBar Component", () => {
  const cartLength = 3;
  const user = userEvent.setup();

  const renderNavBar = (startingLocation) => {
    render(
      <MemoryRouter initialEntries={[startingLocation]} >
      <NavBar cartLength={cartLength}/>
      <Routes>
        <Route path="/" element={<div>home page</div>} />
        <Route path="/products" element={<div>products page</div>} />
        <Route path="/cart" element={<div>cart page</div>} />
      </Routes>
    </MemoryRouter>
    );
  };

  beforeEach(() => {
    renderNavBar("/");
  });

  describe("NavBar Visual", () => {
    it("renders NavBar with title and links", () => {
      expect(screen.getByText("MockBox")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("🛒")).toBeInTheDocument();
      expect(screen.getByText(cartLength)).toBeInTheDocument();
    });

    it("renders Home NavLink as active initially", () => {
      expect(screen.getByText("Home")).toHaveClass(/link_active/);
    });
  });

  describe("NavBar Functionality", () => {
    it('navigates to home page on title click', async () => {
      const title = screen.getByText("MockBox");
      await user.click(title);
      expect(screen.getByText("home page")).toBeInTheDocument();
      expect(screen.queryByText("products page")).not.toBeInTheDocument();
    });
  
    it("navigates to products page on Products NavLink click", async () => {
      const productsLink = screen.getByText("Products");
      await user.click(productsLink);
      expect(screen.getByText("products page")).toBeInTheDocument();
      expect(screen.queryByText("home page")).not.toBeInTheDocument();
    });
  
    it("navigates to cart page on Cart NavLink click", async () => {
      const cartLink = screen.getByText("🛒");
      await user.click(cartLink);
      expect(screen.getByText("cart page")).toBeInTheDocument();
      expect(screen.queryByText("home page")).not.toBeInTheDocument();
    });
  });
});