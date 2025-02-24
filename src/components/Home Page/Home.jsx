import NavBar from "../Nav Bar/NavBar";
import Feature from "../Feature/Feature";
import { useState, useEffect, createContext } from "react";
import Products from '../Products/Products'
import ProductPage from "../Product Page/ProductPage"
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useLocalStorage } from "../../LocalStorage";

export const DataContext = createContext({
    data: [],
});

function Home() {
  const { name } = useParams()
  const [data, setData] = useState()
  const [cart, setCart] = useLocalStorage("cart", []);
  const [selectedItem, setSelectedItem] = useLocalStorage("selectedItem", "");
  const [categoryData, setCategoryData] = useState();
  
  useEffect(() => {
    if(data) return;
    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
    .then(res => {
      if(!res.ok){ throw new Error("Server Error") }
      return res.json()
    })
    .then(json => { 
      setData(json);
      //Categorize Data
      let newObj = {};
      json.forEach(item => {
        const category = item.category
        if(!newObj[category]) { newObj[category] = [] }
        newObj[category].push(item)
    });
    setCategoryData(newObj)
    })
    .catch(err => {
      setData("error")
      console.error(err)
    })
    
  }, [data, categoryData, setCategoryData])
  if(data === "error") return null;
  return (
    <DataContext.Provider value={{ data }}>
      <NavBar cart={cart}/>
      {  name === "product-page" ?
        <ProductPage
        item={selectedItem}
        cart={cart}
        setCart={setCart}
        />
      : name === "products" ?
        <Products 
        setSelectedItem={setSelectedItem} 
        categoryData={categoryData}
        />
      : name === "cart" ?
        <Cart 
        cart={cart} 
        setCart={setCart}
        setSelectedItem={setSelectedItem}
        />
      : <Feature 
        categoryData={categoryData}
        setSelectedItem={setSelectedItem}
        />
      }
    </DataContext.Provider>
  )
}



export default Home