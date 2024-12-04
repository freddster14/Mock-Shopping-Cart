import { Suspense } from "react"
import Loading from "../Route/Loading"
import styles from './Home.module.css'
import PropTypes from "prop-types"

function Home({ items }) {
    let randomIndex = Math.random() * items.length
    return (
      <Suspense fallback={<Loading />}>
        <section>
            <div>
                <h2>Latest Drop</h2>

            </div>
        </section>
        
      </Suspense>
    )
}

Home.prototype = {
    items: PropTypes.array
}




export default Home