import { describe, expect, it, } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../src/components/Cart/Cart";
import NavBar from "../src/components/Nav Bar/NavBar";
import { MemoryRouter} from "react-router-dom";
import { useState } from "react";

describe("Cart Component", () => {
  const defaultCart = [
    { id: 1, title: "Samsung TV", category: "electronics", image: "", price: 1, rating: {rate: 1, count: 100}, 
    value: 1, },
    { id: 3, title: "iPhone", category: "electronics", image: "", price: 5, rating: {rate: 5, count: 200}, 
    value: 1 },
    { id: 5, title: "Nike Shoes", category: "shoes", price: 50, image: "", rating: {rate: 4, count: 500}, 
    value: 3, },
  ];

  const MainComponent = ({ newCart }) => {
    const [cart, setCart] = useState(newCart === undefined ? defaultCart : newCart)
    return (
      <>
        <NavBar cart={cart}/>
        <Cart cart={cart} setCart={setCart}/>
      </>
    )
  }

  const renderCart = (newCart) => {
    return render(
      <MemoryRouter>
        <MainComponent newCart={newCart}/>
      </MemoryRouter>
    )
  }
  
  const navbarCartQuantity = (quantity) => {
    const cartLink = screen.getByRole('link', { name: /🛒/i });
    return  within(cartLink).getByText(quantity);
  }

  const shippingStatus = () => {
    const shippingText = screen.getByText("Shipping");
    const shippingStatus = within(shippingText).queryByText("Free");
    if(!shippingStatus) {
      return screen.getByText("$5.99")
    } else {
      return shippingStatus
    }
  };
  

  it('displays correctly when cart is empty', () => {
    renderCart([])
    const cartQuantity = navbarCartQuantity(0);

    expect(cartQuantity).toBeInTheDocument();
    expect(screen.getByText('Your MockBox Cart is empty')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'latest drop and HOT items.'})).toBeInTheDocument();
  });

  it('displays correct context when cart has items', async () => {
    // cart has 3 items, 5 quantity by default
    renderCart()    
    expect(navbarCartQuantity(5)).toBeInTheDocument();
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(3)
    expect(screen.getByText("Samsung TV")).toBeInTheDocument();
    expect(screen.getByText("$1.00")).toBeInTheDocument();
    expect(within(screen.getByText("Subtotal (5)")).getByText("$156.00")).toBeInTheDocument()
    expect(within(screen.getByText("Items (5)")).getByText("$156.00")).toBeInTheDocument();
    expect(shippingStatus().textContent).toBe("Free")
    expect(within(screen.getByText("Subtotal")).getByText("$156.00")).toBeInTheDocument();
    expect(screen.getByText("Go to checkout")).toBeInTheDocument();
  });

  it("updates when increasing/decrease items", async () => {
    const user = userEvent.setup();
    renderCart();
  
    expect(within(screen.getByText("Items (5)")).getByText("$156.00")).toBeInTheDocument();
    // Adds 1: Samsung TV
    await user.click(screen.getAllByRole("button", {name : "+"})[0])
    expect(within(screen.getByText("Items (6)")).getByText("$157.00")).toBeInTheDocument();
    // Subtract 1: Samsung TV
    await user.click(screen.getAllByRole("button", {name : "−"})[0])
    expect(within(screen.getByText("Items (5)")).getByText("$156.00")).toBeInTheDocument();
  });

  it("updates when user cart is > $45", async () => {
    const user = userEvent.setup();
    renderCart([ { id: 1, title: "Samsung TV", category: "electronics", image: "", price: 30, rating: {rate: 1, count: 100}, 
      value: 1, }
    ]);
    // Cart total < $45
    expect(screen.getByText("Samsung TV")).toBeInTheDocument();
    expect(screen.getByText("Free shipping over $45")).toBeInTheDocument();
    expect(within(screen.getByText("Item (1)")).getByText("$30.00")).toBeInTheDocument();
    expect(shippingStatus().textContent).toBe("$5.99")
    expect(within(screen.getByText("Subtotal")).getByText("$35.99")).toBeInTheDocument();
    // Cart total > $45
    await user.click(screen.getByText("+"));
    expect(screen.getByText("Free shipping")).toBeInTheDocument();
    expect(within(screen.getByText("Items (2)")).getByText("$60.00")).toBeInTheDocument();
    expect(shippingStatus().textContent).toBe("Free")
    expect(within(screen.getByText("Subtotal")).getByText("$60.00")).toBeInTheDocument();
  })

  it("updates when item is deleted", async () => {
    const user = userEvent.setup();
    renderCart();

    expect(screen.queryByText("iPhone")).toBeInTheDocument();
    expect(within(screen.getByText("Items (5)")).getByText("$156.00")).toBeInTheDocument();
    // Delete: iPhone(Cost: 5, Amount: 1)
    await user.click(screen.getAllByRole("button", {name : "Delete"})[1])
    expect(screen.queryByText("iPhone")).not.toBeInTheDocument();
    expect(within(screen.getByText("Items (4)")).getByText("$151.00")).toBeInTheDocument();
  })
})