import { Suspense, useEffect, useState } from "react"
import Loading from "../Route/Loading"
import { Link, useParams } from "react-router-dom"
import styles from './NavBar.module.css'

import PropTypes from "prop-types"

function NavBar() {
    return (
        <Suspense fallback={<Loading />}>
            <nav>
                <h1 className={styles.title}>NavBar</h1>
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/products">Products</Link>
                </div>
            </nav>
        </Suspense>
    )
}

NavBar.propType = {
    items: PropTypes.array
}

export default NavBar 