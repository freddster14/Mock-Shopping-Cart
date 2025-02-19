import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Counter from "../../src/components/Counter/Counter";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Counter Component", () => {
  const MyComponent = ({ amount }) => {
    const [quantity, setQuantity] = useState({value: amount ? amount : 0})
    return (
      <Counter quantity={quantity.value} setQuantity={setQuantity}/>
    )
  }
  const renderCounter = (quantity, url = "/product-page") => {
    render(
      <MemoryRouter initialEntries={[url]}>
        <MyComponent amount={quantity}/>
      </MemoryRouter>
    );
  }
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  it("display content correctly", () => {
    renderCounter(0);
    expect(screen.getByText("−")).toBeInTheDocument();
    expect(screen.getByRole("textbox").value).toBe("0");
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("increments on '+' click", async () => {
    const user = userEvent.setup();
    renderCounter(0);

    await user.click(screen.getByText("+"));
    expect(screen.getByRole("textbox").value).toBe("1");
  });

  it("decrements on '−' click", async () => {
    const user = userEvent.setup();
    renderCounter(10);

    await user.click(screen.getByText("−"));
    expect(screen.getByRole("textbox").value).toBe("9");
    
  });

  it("display entered value(only in product page)", async () => {
    const user = userEvent.setup();
    renderCounter(0);

    await user.type(screen.getByRole("textbox"), "17")
    expect(screen.getByRole("textbox").value).toBe("17");
  })

  it("display 0 when user deletes value in textbox", async () => {
    const user = userEvent.setup();
    renderCounter(10);

    await user.clear(screen.getByRole("textbox"))
    expect(screen.getByRole("textbox").value).toBe("0");
  });

  it("minimally shows 1 in Cart Page", async () => {
    const user = userEvent.setup();
    renderCounter(1, "/cart");

    expect(screen.getByRole("textbox").value).toBe("1");
    await user.click(screen.getByText("−"));
    expect(screen.getByRole("textbox").value).toBe("1");
    
  });

  it("maxes out on 99", async () => {
    const user = userEvent.setup();
    renderCounter(99);

    expect(screen.getByRole("textbox").value).toBe("99");
    await user.click(screen.getByText("+"));
    expect(screen.getByRole("textbox").value).toBe("99");
  });
})