import { describe, expect, it, vi, } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feature from "../../src/components/Feature/Feature";
import NavBar from "../../src/components/Nav Bar/NavBar";
import { MemoryRouter, useLocation } from "react-router-dom";
import categoryData from "../MockData";
import { useContext } from "react";
import { DataContext } from "../../src/components/Home Page/Home";




describe("Feature Component", () => {
  const defaultData = Object.values(categoryData).flat()
  const setSelectedItem = vi.fn()
  const MockHome = ({ data }) => {
    const location = useLocation();
    return (
      <DataContext.Provider value={{data}}>
        <NavBar cart={[]}/>
        {location.pathname === "/" ?
          <Feature categoryData={categoryData} setSelectedItem={setSelectedItem} />
          : <h1>{location.pathname}</h1>
        }
      </DataContext.Provider>  
    )
  }
  const renderFeature = (data) => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <MockHome  data={data}/>
        </MemoryRouter>
     
    )
  };

  const itemTitles = defaultData.map(item => item.title)

  it("renders data correctly", async () => {
    renderFeature(defaultData);

    const latestDropItem = screen.getByRole('heading', { level: 3 }).textContent;
    expect(screen.getByText("Latest Drop")).toBeInTheDocument();
    expect(itemTitles.includes(latestDropItem)).toBe(true);

    expect(screen.getByText("Jump into a Category")).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Shoes')).toBeInTheDocument();

    expect(screen.getByText("Hottest Items")).toBeInTheDocument();
    const listOfItems = screen.getAllByRole('heading', { level: 2 }).slice(1);
    listOfItems.map(item => expect(itemTitles.includes(item.textContent)).toBe(true));
  });

  it("feature items stay the same when user switch pages", async () => {
    const user = userEvent.setup();
    renderFeature(defaultData);

    const firstLatestDropItem = screen.getByRole('heading', { level: 3 }).textContent;
    const firstListOfItems = screen.getAllByRole('heading', { level: 2 }).slice(1);
    expect(screen.getByText("Latest Drop")).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Products'}));
    expect(screen.queryByText("Latest Drop")).not.toBeInTheDocument();
    expect(screen.getByText("/products/")).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Home'}));
    const secondLatestDropItem = screen.getByRole('heading', { level: 3 }).textContent;
    const secondListOfItems = screen.getAllByRole('heading', { level: 2 }).slice(1);
    expect(screen.queryByText("Latest Drop")).toBeInTheDocument();
    expect(secondLatestDropItem).toBe(firstLatestDropItem);
    expect(secondListOfItems).toStrictEqual(firstListOfItems);
  });

  it("render different items when page refreshes(may give error due to random chance)", async () => {
    renderFeature(defaultData);
    const firstLatestDropItem = screen.getByRole('heading', { level: 3 }).textContent;
    const firstListOfItems = screen.getAllByRole('heading', { level: 2 }).slice(1);
   
    cleanup(); // Clear DOM
    renderFeature(undefined); // Clear localStorage due to useEffect conditions;
    cleanup();
    
    renderFeature(defaultData)
    const secondLatestDropItem = screen.getByRole('heading', { level: 3 }).textContent;
    const secondListOfItems = screen.getAllByRole('heading', { level: 2 }).slice(1);
    expect(secondLatestDropItem).not.toBe(firstLatestDropItem)
    expect(secondListOfItems).not.toStrictEqual(firstListOfItems);
  });

  it("clicking hero item navigates and sets selected item", async () => {
    const user = userEvent.setup();
    renderFeature(defaultData);
    const hero = screen.getByRole('heading', { level: 3 })
    await user.click(hero);
    expect(setSelectedItem).toHaveBeenCalled()
    expect(screen.getByText("/product-page")).toBeInTheDocument();
  })
})