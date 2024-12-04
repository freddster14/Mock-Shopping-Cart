import { Suspense } from "react"
import Loading from "../Route/Loading"
import styles from './Home.module.css'
import PropTypes from "prop-types"

function Home({ items }) {

    if(!items) return

    let arrayOfItems = randomIndex(items)
    console.log()
    return (
        <HomeContent 
        heroItem={arrayOfItems[0]}
        subItems={arrayOfItems}
        />
    )
  
}

function HomeContent({
    heroItem,
    subItems,
}) {

    console.log(subItems)
    return (
        <Suspense fallback={<Loading />}>
          <section>
              <div>
                  <h2>Latest Drop</h2>
                  <img src={heroItem.image} alt={heroItem.title} />
                  <h3>{heroItem.title}</h3>
                  <p>${heroItem.price}</p>
              </div>
          </section>
          
        </Suspense>
      )
}


function randomIndex(array) {
    let indexArray = []
    while(indexArray.length !== 4 ) {
        let index = Math.floor(Math.random() * array.length)
        if(!indexArray.includes(array[index])) indexArray.push(array[index]);
    }
    
    return indexArray
}


Home.prototype = {
    items: PropTypes.array
}



export default Home