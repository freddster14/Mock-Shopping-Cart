import { MemoryRouter, useParams } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Home from "../src/components/Home Page/Home";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

const server = setupServer(
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "Samsung TV 50inch",
        price: 999,
        category: "electronics",
        description: "Top notch built quality, Super Older screen, 4k resolution, and 120hz refresh rate for those gamers!",
      },
    ])
  })
)

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useParams: vi.fn()
  }
})

//Mock Child Components
vi.mock("/src/components/Nav Bar/NavBar.jsx", () => ({
    default: () => <div>NavBar</div>
}));

vi.mock("/src/components/Product Page/ProductPage.jsx", () => ({
  default: () => <div>Product Page</div>
}));

vi.mock("/src/components/Products/Products.jsx", () => ({
  default: () => <div>Products</div>
}));

vi.mock("/src/components/Cart/Cart.jsx", () => ({
  default: () => <div>Cart</div>
}));

vi.mock("/src/components/Feature/Feature.jsx", () => ({
  default: ({data, categoryData, setSelectedItem}) => (
  <>
    <div>Feature</div>
    <div>{data && data[0].title}</div>
  </>
)
}));




describe("Home Component", () => {
  const renderHome = (params) => {
    useParams.mockReturnValue({name: params})
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
  };

 
  describe("Home params logic", () => {

    it("render of Feature when params is undefined", async () => {
      renderHome(undefined)
      expect(await screen.getByText("NavBar")).toBeInTheDocument();
      expect(await screen.getByText("Feature")).toBeInTheDocument();
    });
  
    it("renders ProductPage when name is product-page", () => {
      renderHome("product-page");
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Product Page")).toBeInTheDocument();
    });
  
    it("renders Products when name is products", () => {
      renderHome("products");
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
    });
  
    it("renders Cart when name is cart", () => {
      renderHome("cart");
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Cart")).toBeInTheDocument();
    });
  });

  describe("fetch logic", () => {
    beforeAll(() => {
      server.listen()
    })
    afterEach(() => {
      server.resetHandlers();
    })
    afterAll(() => {
      server.close()
    })
    it("fetches data from fakestoreapi", async () => {
      renderHome(undefined)
      expect(await screen.findByText("Feature")).toBeInTheDocument();
      expect(await screen.findByText("NavBar")).toBeInTheDocument();
      expect(await screen.findByText("Samsung TV 50inch")).toBeInTheDocument();
   })

  })
})
