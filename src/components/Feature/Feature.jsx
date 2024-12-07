import { Suspense } from "react"
import Loading from "../Route/Loading"
import styles from './Feature.module.css'
import PropTypes from "prop-types"

function Feature({ items }) {
    if(!items) return
    let arrayOfItems = randomIndex(items)
    console.log(arrayOfItems)
    return (
        <FeatureContent 
        heroItem={arrayOfItems[0]}
        subItems={arrayOfItems[1]}
        />
    )
}

Feature.propTypes = {
    items: PropTypes.array.isRequired
}

function FeatureContent({
    heroItem,
    subItems,
}) {
    return (
        <Suspense fallback={<Loading />}>
          <header>
              <div className={styles.hero_item}>
                  <h2>Latest Drop</h2>
                  <img src={heroItem.image} alt={heroItem.title} />
                  <div className={styles.hero_item_info}>
                    <h3>{heroItem.title}</h3>
                    <p>${heroItem.price}</p>
                  </div>
                  
              </div>
          </header>
          <section>
            {subItems.map((item => (
                <div className={styles.sub_item} key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.item_info}>
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>
            )))}
          </section>
        </Suspense>
      )
}

FeatureContent.propTypes = {
    heroItem: PropTypes.object,
    subItems: PropTypes.array
}

function randomIndex(array) {
    let indexArray = []
    let subArray = []
    while(indexArray.length !== 4 ) {
        let index = Math.floor(Math.random() * array.length)
        if(!indexArray.includes(array[index])) indexArray.push(array[index]);
    }
    subArray = indexArray.slice(1)
    return [indexArray[0], subArray]
}


export default Feature