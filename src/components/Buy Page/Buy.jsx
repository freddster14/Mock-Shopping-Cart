import PropTypes from "prop-types"
import { useEffect, useState } from "react"

function Buy({
    item
}) {
   
    

    return (
        <>
          <ul>
            <li>{item}</li>
          </ul>
        </>
    )
}

Buy.propTypes = {
    item: PropTypes.object
}


export default Buy