import { Link } from "react-router-dom"
import styles from './NavBar.module.css'

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

export default NavBar 