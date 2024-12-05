import { Suspense, useEffect, useState } from "react"
import Loading from "../Route/Loading"
import { Link, useParams } from "react-router-dom"
import styles from './NavBar.module.css'
import Home from "../Home Page/Home"
import Products from "../Products/Products"
import Buy from "../Buy Page/Buy"

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
              <Buy item={selectedItem}/>
            : name === "products" ?
            <Products items={data}/>
            : <Home items={data}/>
            }
        </Suspense>
    )
}




export default NavBar