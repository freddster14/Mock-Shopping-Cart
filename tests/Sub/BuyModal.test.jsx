import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BuyModal from "../../src/components/Product Page/BuyModal";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";

describe('Buy Modal Component', () => {
  const  item = {
    title: "Samsung TV",
    description: "All new Samsung TV with latest tech. New Super Oled and 120hz refresh rate for gamers. Up to 8k",
    rating: {rate: 4.3, count: 400},
    image: "/src/assets/fullstar.png",
    id: 1,
    price: 1099.00
  };
  const setUserAddToCart = vi.fn();
  let cart = [item]
  const setCart = newCart => cart = newCart;
  const MyComponent = () => {
    const location = useLocation();
    return (
      <>
        <h1>{location.pathname}</h1>
        {location.pathname === '/product-page' && 
          <BuyModal item={item} setUserAddToCart={setUserAddToCart} cart={cart} setCart={setCart}/>
        }
      </>
    )
  }
  const renderModal = (url = '/product-page') => {
    if(cart.length === 0) cart = [item]
    render(
      <MemoryRouter initialEntries={[url]}>
        <MyComponent />
      </MemoryRouter>
    )
  };

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // tests/Main/ProductPage - checks if Component loads/renders correctly;
  it("removes item and modal when user clicks 'Remove item'", async () => {
    const user = userEvent.setup();
    renderModal();
    expect(cart.includes(item)).toBe(true);
    await user.click(screen.getByText('Remove item'));
    expect(cart.includes(item)).toBe(false);
    expect(setUserAddToCart).toHaveBeenCalledOnce();
  });

  it("Moves to '/cart' url when user clicks 'See in cart'", async () => {
    const user = userEvent.setup();
    renderModal();
    expect(screen.getByText('/product-page')).toBeInTheDocument();

    await user.click(screen.getByText('See in cart'));
    expect(screen.getByText('/cart')).toBeInTheDocument();
  })

  it("closes modal when user clicks '×'", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText('×'));
    expect(setUserAddToCart).toHaveBeenCalledOnce();
  });
})