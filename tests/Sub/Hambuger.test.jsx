import { beforeEach, describe, expect, it, vi } from "vitest";
import HamburgerMenu from "../../src/components/Products/HamburgerMenu";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Hamburger Menu Componenet', () => {
  const setMenuDisplay = vi.fn(() => menuDisplay = !menuDisplay);
  const user = userEvent.setup();
  let menuDisplay = false

  beforeEach(() => {
    menuDisplay = false
  })

  it("renders the hamburger icon", () => {
    render(<HamburgerMenu menuDisplay={menuDisplay} setMenuDisplay={setMenuDisplay}/>);
    expect(screen.getByAltText('side bar button')).toBeInTheDocument();
    expect(screen.getByAltText('side bar button')).not.toHaveClass(/hamburger_active/);
  });

  it("toggle menu state on click", async () => {
    render(<HamburgerMenu menuDisplay={menuDisplay} setMenuDisplay={setMenuDisplay}/>);

    const hamburgerIcon = screen.getByAltText('side bar button');
    await user.click(hamburgerIcon);
    expect(hamburgerIcon).toHaveClass(/hamburger_active/);
    expect(menuDisplay).toBe(true)
    expect(setMenuDisplay).toHaveBeenCalledOnce();
  });
  
  it('menuDisplay updates on window resize', () => {
    render(<HamburgerMenu menuDisplay={menuDisplay} setMenuDisplay={setMenuDisplay}/>);
    // Resize wider
    expect(menuDisplay).toBe(false)
    window.innerWidth = 1000;
    window.dispatchEvent(new Event('resize'))
    expect(setMenuDisplay).toHaveBeenCalled();
    expect(menuDisplay).toBe(true);
    // Resize smaller
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'))
    expect(menuDisplay).toBe(false);
  })
}) 