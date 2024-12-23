import PropTypes from "prop-types"

function Loading({ styleName }) {
    return <div id="loading" className={styleName}></div>
}

Loading.propTypes = {
    styleName: PropTypes.string
} 


export default Loading