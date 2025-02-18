import { describe, expect, it, vi } from "vitest";
import ProductPage from "../src/components/Product Page/ProductPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

//Mock updateCart
vi.mock("/src/components/Cart/CartLogic.js", () => {
  return {
    updateCart: (cart, item, quantity) => {
      cart.push({...item, value: quantity})
    }
  }
})

describe("Product Page Component", () => {
  const renderProductPage = () => {
    const cart = [];
    const setCart = () => {};
    const item = {
      title: "Samsung TV",
      description: "All new Samsung TV with latest tech. New Super Oled and 120hz refresh rate for gamers. Up to 8k",
      rating: {rate: 4.3, count: 400},
      image: "/src/assets/fullstar.png",
      id: 1,
      price: 1099.00
    }
    
    render(
      <MemoryRouter initialEntries={['/product-page']}>
        <ProductPage item={item} cart={cart} setCart={setCart}/>
      </MemoryRouter>
    )
  }
  it("renders item accordingly", () => {
    renderProductPage()
    expect(screen.getByText("Samsung TV")).toBeInTheDocument();
    expect(
      screen.getByText(/All new Samsung TV with latest tech./i)
    ).toBeInTheDocument();
    expect(screen.getByText("$1099.00")).toBeInTheDocument();
    expect(screen.getByText("4.3")).toBeInTheDocument();
    expect(screen.getByText("400 ratings")).toBeInTheDocument();
    expect(screen.getByText(
      /All new Samsung TV with latest tech. New Super Oled and 120hz refresh rate for gamers. Up to 8k/i
    )).toBeInTheDocument()
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Returns")).toBeInTheDocument();
    expect(screen.getByText("Warranty")).toBeInTheDocument();
  });

  it("displays Add to Cart button when quantity > 0", async () => {
    const user = userEvent.setup();
    renderProductPage()
    const plusQuantity = screen.getByText("+")
    await user.click(plusQuantity);
    expect(screen.getByText("Add To Cart")).toBeInTheDocument();
  })

  it("display modal when added product to cart", async () => {
    const user = userEvent.setup();
    renderProductPage()
    const plusQuantity = screen.getByText("+")

    await user.click(plusQuantity);
    const addToCart = screen.getByText("Add To Cart");
    await user.click(addToCart);

    const confirmation = screen.getByText("Added to cart")
    const inCartText = screen.getByText("In Cart")
    expect(confirmation).toBeInTheDocument();
    expect(inCartText).toBeInTheDocument();
    expect(screen.getByText("See in cart")).toBeInTheDocument();
    expect(screen.getByText("Remove item")).toBeInTheDocument();
  })

  it("display dropdown information on click", async () => {
    const user = userEvent.setup();
    renderProductPage();
    expect(screen.queryByText(
      /Free standard shipping on orders over $35. On most stores/i
    )).not.toBeInTheDocument();

    await user.click(screen.getByText('Shipping'));
    expect(screen.queryByText(
      /Free standard shipping on orders over/i
    )).toBeInTheDocument();
  })
})