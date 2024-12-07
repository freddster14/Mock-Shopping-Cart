import NavBar from "../Nav Bar/NavBar";
import Feature from "../Feature/Feature";
import { useState, useEffect } from "react";
import Products from '../Products/Products'
import Buy from "../Buy Page/Buy"
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";

function Home() {
    const { name } = useParams()
    const [data, setData] = useState();
    const [cart, setCart] = useState([]);
    const [selectedItem, setSelectedItem] = useState()
    useEffect(() => {
        console.log("ran")
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
    return(
        <>
         <NavBar/>
         {name === "buy" ?
            <Buy item={selectedItem}/>
          : name === "products" ?
            <Products 
            items={data} 
            setSelectedItem={setSelectedItem} />
          : name === "cart" ?
            <Cart 
            cartItems={cart} 
            setSelectedItem={setSelectedItem} />
          : <Feature 
            items={data} 
            setSelectedItem={setSelectedItem} />
          }
        </>
       
    )
}

export default Home