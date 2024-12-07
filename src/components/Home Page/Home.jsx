import NavBar from "../Nav Bar/NavBar";
import Feature from "../Feature/Feature";
import { useState, useEffect, Suspense } from "react";
import Products from '../Products/Products'
import Buy from "../Buy Page/Buy"
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import Loading from "../Route/Loading";

function Home() {
    const { name } = useParams()
    const [data, setData] = useState();
    const [cart, setCart] = useState([]);
    const [featureItems, setFeatureItems] = useState();
    const [selectedItem, setSelectedItem] = useState();
    useEffect(() => {
        console.log("ran")
        fetch('https://fakestoreapi.com/products')
            .then(res=> {
                if(res.status >= 400){
                    throw new Error("Load Failed")
                }
                return res.json()
            })
            .then(json=> applyData(json))
            .catch(err => console.log(err))

    }, [])

    function applyData(items) {
        const randomItems = randomIndex(items)
        setData(items)
        setFeatureItems(randomItems)
    }
    return(
        <Suspense fallback={<Loading />}>
         <NavBar/>
         {name === "buy" ?
            <Buy 
            item={selectedItem}
            addToCart={setCart}
            />
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
            featureItems={featureItems}
            setSelectedItem={setSelectedItem} />
          }
        </Suspense>
       
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