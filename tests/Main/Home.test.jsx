import { MemoryRouter, useParams } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Home, { DataContext } from "../../src/components/Home Page/Home";
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { useContext } from "react";

//Mock fetch
const server = setupServer(
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "Samsung TV",
        category: "electronics",
      },
      {
        id: 2,
        title: "Adidas Shoes",
        category: "shoes",
      },
      {
        id: 3,
        title: "iPhone",
        category: "electronics",
      },
      {
        id: 4,
        title: "Dell Laptop",
        category: "electronics",
      },
      
      {
        id: 5,
        title: "Nike Shoes",
        category: "shoes",
      },
      {
        id: 6,
        title: "Puma Shoes",
        category: "shoes",
      }
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
  default: function ProductMock() {
    const { data } = useContext(DataContext)
    return(
      <>
        <div>Products</div>
      {data && 
        data.map(item => (
          <div key={item.id}>{item.title}</div>
        ))
      }
     </>
    )
  }
}));

vi.mock("/src/components/Cart/Cart.jsx", () => ({
  default: () => <div>Cart</div>
}));

vi.mock("/src/components/Feature/Feature.jsx", () => ({
  default: ({categoryData}) => (
  <>
    <div>Feature</div>
    { categoryData &&
      Object.keys(categoryData).map((key) => {
        let sameCategory = true;
        categoryData[key].map((item) => {
          if(key !== item.category) return sameCategory = false
          
        })
        if(!sameCategory) {
          return (<div key={key}>not same category</div>)
        } else {
          return <div key={key}>same category</div>
        }
        
      })
    }
  </>
)
}));

describe("Home Component", () => {
  const renderHome = (params) => {
    useParams.mockReturnValue({name: params})
    return render(
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
    it("fetches data from fakestoreapi and display on products page", async () => {
      renderHome("products")
      expect(await screen.findByText("Products")).toBeInTheDocument();
      expect(await screen.findByText("Samsung TV")).toBeInTheDocument();
      expect(await screen.getByText("Puma Shoes")).toBeInTheDocument();
    });

    it("fetches data from fakestoreapi and categorizes it", async () => {
        renderHome(undefined)
        const categoryConfirm = await screen.findAllByText(/same category/i);
        expect(await screen.findByText("Feature")).toBeInTheDocument();
        categoryConfirm.forEach((e) => {
          expect(e.textContent).toBe("same category");
          expect(e.textContent).not.toBe("not same category")
        })
    });

    it("display error message when server return error", async () => {
      const consoleError = vi.spyOn(console, "error");
      server.use(
        http.get("https://fakestoreapi.com/products", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );
      renderHome(undefined)
      const expectedError = new Error("Server Error")
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith(expectedError);
      })
    })
  })
})
