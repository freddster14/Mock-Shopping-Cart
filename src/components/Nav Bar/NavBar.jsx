import { useNavigate, NavLink, useParams, useLocation } from "react-router-dom"
import styles from './NavBar.module.css'
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function NavBar({ cartLength }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [lastCategory, setLastCategory] = useState();
  const location = useLocation();
  const isProductsPage = location.pathname.includes("products");
  //Keeps track of category
  useEffect(() => {
    if(isProductsPage) {
      setLastCategory(category)
    }
  }, [category, isProductsPage])
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
            className={({isActive}) =>
            isActive ? styles.link_active : ""}>
            Home
            </NavLink>
            <NavLink
            to={`/products/${lastCategory || ""}`}
            className={({isActive}) =>
            isActive ? (styles.link_active) : ""} >
            Products
            </NavLink>
            <NavLink
            to="/cart"
            id={styles.cart_icon}
            className={({isActive}) =>
            isActive ? styles.link_active : ""}>
            🛒<span className={styles.cart_quantity}>{cartLength}</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

NavBar.propTypes = {
  cartLength: PropTypes.number,
}

export default NavBar 