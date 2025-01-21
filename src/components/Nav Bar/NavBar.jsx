import { useNavigate, NavLink, useParams, useLocation } from "react-router-dom"
import styles from './NavBar.module.css'
import { useEffect, useState } from "react";

function NavBar() {
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
          Title
          </h1>
          <div className={styles.link_container}>
            <NavLink
            to="/"
            className={({isActive}) =>
            isActive ? styles.link_active : ""}>
            Home
            </NavLink>
            <NavLink
            to={`products/${lastCategory || ""}`}
            className={({isActive}) =>
            isActive ? (styles.link_active) : ""} >
            Products
            </NavLink>
            <NavLink
            to="cart"
            className={({isActive}) =>
            isActive ? styles.link_active : ""}>
            Cart
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar 