import { Suspense } from "react"
import { Link } from "react-router-dom"
import Loading from "../Route/Loading"

function Home() {
    return (
      <Suspense fallback={<Loading />}>
        <nav>
            <h1>Home Page</h1>
            <div>
                <Link to="/shop">Items</Link>
            </div>
        </nav>
        <header>
            <h1>Shop Latest Dealz</h1>
            
        </header>
        <section>

        </section>
        
      </Suspense>
    )
}




export default Home