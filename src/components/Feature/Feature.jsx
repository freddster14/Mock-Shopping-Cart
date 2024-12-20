import Loading from "../Route/Loading"
import Category from "./Category"
import { useLocalStorage } from "../../LocalStorage"
import styles from './Feature.module.css'
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Feature ({ data, setSelectedItem }) {
  const [featureItems, setFeatureItems] = useLocalStorage("featureItems", "");

  function randomIndex(array) {
    let indexArray = []
    let subArray = []
    while(indexArray.length !== 4 ) {
        let index = Math.floor(Math.random() * array.length)
        if(!indexArray.includes(array[index])) indexArray.push(array[index]);
    }
    subArray = indexArray.slice(1)
    setFeatureItems([indexArray[0], subArray])
}

  useEffect(() => {
    const event = () => {
      setFeatureItems('')
    }
    window.addEventListener('beforeunload', event)
    return () => {
      window.removeEventListener('beforeunload', event)
    }
  },[setFeatureItems])

  
  if(!featureItems && data) randomIndex(data)
    return (
      <FeatureContent 
      heroItem={featureItems[0]}
      subItems={featureItems[1]}
      setSelectedItem={setSelectedItem}
      />
    )
}

Feature.propTypes = {
    data: PropTypes.array,
    setSelectedItem: PropTypes.func,
}

function FeatureContent ({
    heroItem,
    subItems,
    setSelectedItem,
}) {

  const navigate = useNavigate();

  function eventFunction(item) {
    setSelectedItem(item)
    navigate('/buy')
  }

    return (
        <>
          {!heroItem ? <Loading styleName={styles.header}/> : 
          <header className={styles.header}>
              <div className={styles.hero_item} onClick={() => eventFunction(heroItem)}>
                  <div className={styles.image_container}>
                    <img src={heroItem.image} alt={heroItem.title} />
                  </div>
                  <div className={styles.hero_item_info}>
                    <h2 className={styles.hero_item_title}>Latest Drop</h2>
                    <h3>{heroItem.title}</h3>
                    <p>${heroItem.price}</p>
                  </div>
              </div>
          </header>}
          <section>
            <h2>Jump into a Category</h2>
            <div>
              <Category />
            </div>
          </section>
          {!subItems ? <Loading styleName={styles.sub_items_load}/>
          :
          
          <section>
            <h2>Hottest Items</h2>
            <div className={styles.sub_items}>
            {subItems.map((item => (
                <div className={styles.sub_item} key={item.id} onClick={() => eventFunction(item)}>
                  <div className={styles.sub_image_container}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.sub_item_info}>
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>
            )))}
            </div>
            
          </section>
          }
        </>
      )
}

FeatureContent.propTypes = {
    heroItem:  PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.string,
  }),
    subItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
    })),
    setSelectedItem: PropTypes.func,
}




export default Feature