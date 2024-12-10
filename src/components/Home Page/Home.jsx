import NavBar from "../Nav Bar/NavBar";
import Feature from "../Feature/Feature";
import { useState, useEffect } from "react";
import Products from '../Products/Products'
import Buy from "../Buy Page/Buy"
import { useLocation, useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useLocalStorage } from "../../LocalStorage";

function Home() {
    const { name } = useParams()
    const location = useLocation()
    const [data, setData] = useState()
  
    const [cart, setCart] = useLocalStorage("cart", []);
    const [selectedItem, setSelectedItem] = useLocalStorage("selectedItem", "");
    const [featureItems, setFeatureItems] = useLocalStorage("featureItems", "");
    useEffect(() => {
        if(data) return
        console.log("ran")
        fetch('https://fakestoreapi.com/products', { mode: 'cors' })
            .then( res=> {
                if(res.status >= 400){
                    throw new Error("Load Failed")
                }
                return res.json()
            })
            .then( json => {
                setData(json)
                //resets feature items only on home screen
                if(location.pathname === '/home') {
                    const randomItems = randomIndex(json)
                    setFeatureItems(randomItems)
                }
            })
            .catch(err => console.log(err))

    }, [location, setFeatureItems, data])

    return (
        <>
         <NavBar/>
         {  name === "buy" ?
            <Buy 
            item={selectedItem}
            cart={cart}
            addToCart={setCart}
            />
          : name === "products" ?
            <Products 
            items={data} 
            setSelectedItem={setSelectedItem} />
          : name === "cart" ?
            <Cart 
            cartItems={cart} 
            setCart={setCart} />
          : <Feature 
            featureItems={featureItems}
            setSelectedItem={setSelectedItem} />
         }
       
        </>
        
       
    )
}


function randomIndex(array) {
    let indexArray = []
    let subArray = []
    while(indexArray.length !== 4 ) {
        let index = Math.floor(Math.random() * array.length)
        if(!indexArray.includes(array[index])) indexArray.push(array[index]);
    }
    subArray = indexArray.slice(1)
    return [indexArray[0], subArray]
}

export default Home