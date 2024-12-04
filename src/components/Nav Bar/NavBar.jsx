import { Suspense, useEffect, useState } from "react"
import Loading from "../Route/Loading"
import { Link, useParams } from "react-router-dom"
import styles from './NavBar.module.css'
import Home from "../Home Page/Home"
import Products from "../Products/Products"

function NavBar() {
    const {name} = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res=> {
                if(res.status >= 400){
                    throw new Error("Load Failed")
                }
                return res.json()
            })
            .then(json=> setData(json))
            .catch(err => console.log(err))

    }, [])

    console.log(data)

    return (
        <Suspense fallback={<Loading />}>
        <nav>
            <h1 className={styles.title}>NavBar</h1>
            <div>
                {name && <Link to="/">Home</Link>}
                <Link to="/products">Products</Link>
                
            </div>
        </nav>
        {name === "shopItem" ?
          (<h1>Shop</h1>)
        : name === "products" ?
          <Products items={data}/>
        : <Home items={}/>
        }
        </Suspense>
    )
}




export default NavBar