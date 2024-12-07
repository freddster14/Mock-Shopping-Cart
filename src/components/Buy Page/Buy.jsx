import PropTypes from "prop-types"

function Buy({
    item
}) {
    console.log(item)

    return (
        <>
        <img src={item.image} alt={item.title} />
        <div>
          <h1>{item.title}</h1>
          <h3>{item.price}</h3>
          <p>{item.description}</p>
        </div>
         
        </>
    )
}

Buy.propTypes = {
    item: PropTypes.object
}


export default Buy