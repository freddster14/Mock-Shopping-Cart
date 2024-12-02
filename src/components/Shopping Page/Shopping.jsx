import { useEffect, useState } from "react"

function Shopping() {
    const [data, setData] = useState()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>console.log(json))
    })

    return (
        <>
          <h1>{data}</h1>
        </>
    )
}


export default Shopping