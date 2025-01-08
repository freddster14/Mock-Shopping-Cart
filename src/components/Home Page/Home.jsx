import NavBar from "../Nav Bar/NavBar";
import Feature from "../Feature/Feature";
import { useState, useEffect } from "react";
import Products from '../Products/Products'
import Buy from "../Buy Page/Buy"
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useLocalStorage } from "../../LocalStorage";

function Home() {
    const { name } = useParams()
    const [data, setData] = useState()
    const [cart, setCart] = useLocalStorage("cart", []);
    const [selectedItem, setSelectedItem] = useLocalStorage("selectedItem", "");

    useEffect(() => {
        if(data) return
        fetch('https://fakestoreapi.com/products', { mode: 'cors' })
            .then(res => {
                if(!res.ok){
                  throw new Error("Server Error")
                }
                return res.json()
            })
            .then(json => {
                setData(json)
                //resets feature items only on home screen
            })
            .catch(err => {
              setData("error")
              console.error(err)
            })
    }, [data])
    if(data === "error") throw new Error("Failed to get Information")
    return (
        <>
         <NavBar/>
         {  name === "buy" ?
            <Buy 
            item={selectedItem}
            cart={cart}
            setCart={setCart}
            />
          : name === "products" ?
            <Products 
            items={data} 
            setSelectedItem={setSelectedItem} />
          : name === "cart" ?
            <Cart 
            cart={cart} 
            setCart={setCart} />
          : <Feature 
            data={data}
            setSelectedItem={setSelectedItem}
            />
         }
        </>
    )
}



export default Home