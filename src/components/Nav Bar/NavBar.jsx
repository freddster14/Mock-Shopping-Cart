import { Link } from "react-router-dom"
import styles from './NavBar.module.css'

import PropTypes from "prop-types"

function NavBar() {
    return (
        <>
            <nav>
                <h1 className={styles.title}>NavBar</h1>
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                </div>
            </nav>
        </>
    )
}

NavBar.propType = {
    items: PropTypes.array
}

export default NavBar 