import PropTypes from "prop-types"

function Products({ items }) {
    console.log(items)
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