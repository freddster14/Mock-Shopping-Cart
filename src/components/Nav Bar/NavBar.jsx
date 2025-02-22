import { useNavigate, NavLink, useParams, useLocation } from "react-router-dom"
import styles from './NavBar.module.css'
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function NavBar({ cart }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [lastCategory, setLastCategory] = useState();
  const location = useLocation();
  const isProductsPage = location.pathname.includes("products");
  const getCartItems = () => {
    return cart.reduce((quantity, item) => quantity + item.value, 0);
  }

  //Keeps track of category
  useEffect(() => {
    if(isProductsPage) {
      setLastCategory(category)
    }
  }, [category, isProductsPage])

  const scrollTo = () => {
    window.scrollTo({
      top:0,
    });
  }
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav_items}>
          <h1
          onClick={() => navigate('/')}
          className={styles.title}>
          MockBox
          </h1>
          <div className={styles.link_container}>
            <NavLink
            to="/"
            onClick={scrollTo}
            className={({isActive}) =>
            isActive ? styles.link_active : ""}>
            Home
            </NavLink>
            <NavLink
            to={`/products/${lastCategory || ""}`}
            onClick={scrollTo}
            className={({isActive}) =>
            isActive ? (styles.link_active) : ""} >
            Products
            </NavLink>
            <NavLink
            to="/cart"
            id={styles.cart_icon}
            onClick={scrollTo}
            className={({isActive}) =>
            isActive ? styles.link_active : ""}>
            🛒<span className={styles.cart_quantity}>{getCartItems()}</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

NavBar.propTypes = {
  cart: PropTypes.array,
}

export default NavBar 