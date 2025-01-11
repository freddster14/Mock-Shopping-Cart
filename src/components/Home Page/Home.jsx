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
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    if(data) return
    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
    .then(res => {
      if(!res.ok){ throw new Error("Server Error") }
      return res.json()
    })
    .then(json => { 
      setData(json);
      //Categorize Data
      if(!categoryData) {
        let newObj = {};
        json.forEach(item => {
          const category = item.category
          if(!newObj[category]) { newObj[category] = [] }
          newObj[category].push(item)
      });
      setCategoryData(newObj)
      }
    })
    .catch(err => {
      setData("error")
      console.error(err)
    })
    
  }, [data, categoryData, setCategoryData])

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
        setSelectedItem={setSelectedItem} 
        categoryData={categoryData}
        />
      : name === "cart" ?
        <Cart 
        cart={cart} 
        setCart={setCart} />
      : <Feature 
        data={data}
        categoryData={categoryData}
        setSelectedItem={setSelectedItem}
        />
      }
    </>
  )
}



export default Home