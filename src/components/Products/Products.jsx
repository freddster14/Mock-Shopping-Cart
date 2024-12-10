import PropTypes from "prop-types"
import { Suspense } from "react"
import Loading from "../Route/Loading"

function Products({ items }) {
    console.log(items)
    if(!items) return <Loading/>
    
    return (
        
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
           ))}
        </ul>
       
    )
}

Products.propTypes = {
    items: PropTypes.array
}

export default Products