import { useNavigate, NavLink } from "react-router-dom"
import styles from './NavBar.module.css'

function NavBar() {
    const navigate = useNavigate()    
    return (
        <>
          <nav className={styles.nav}>
              <h1
              onClick={() => navigate('/')} 
              className={styles.title}>
              Title</h1>
              <div className={styles.link_container}>
                <NavLink 
                  to="/"
                  className={({isActive}) =>
                  isActive ? styles.link_active : ""}>
                  Home
                </NavLink>
                <NavLink 
                  to="products" 
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
          </nav>
        </>
    )
}

export default NavBar 