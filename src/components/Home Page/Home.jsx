import NavBar from "../Nav Bar/NavBar";
import Feature from "../Feature/Feature";
import { useState, useEffect } from "react";
import Products from '../Products/Products'
import Buy from "../Buy Page/Buy"
import { useParams } from "react-router-dom";

function Home() {
    const { name } = useParams()
    const [data, setData] = useState();
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
         {name === "shopItem" ?
              <Buy item={null}/>
            : name === "products" ?
              <Products items={data}/>
            : <Feature items={data} />
            }
        </>
       
    )
}

export default Home