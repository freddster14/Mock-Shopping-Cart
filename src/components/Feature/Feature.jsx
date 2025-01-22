import Loading from "../Route/Loading"
import  Category  from "./Category"
import Rating from "../Rating/Rating"
import { useLocalStorage } from "../../LocalStorage"
import styles from './Feature.module.css'
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Feature ({ data, setSelectedItem, categoryData, }) {
  const [featureItems, setFeatureItems] = useLocalStorage("featureItems", "");
  useEffect(() => {
    if(!data) {
      setFeatureItems('')
    }
  },[data, setFeatureItems])

  function randomIndex(array) {
    if(array && !featureItems) {
      let indexArray = []
    let subArray = []
    //Card items append
    while(indexArray.length !== 5 ) {
        let index = Math.floor(Math.random() * array.length)
        if(!indexArray.includes(array[index])) indexArray.push(array[index]);
    }
    subArray = indexArray.slice(1)
    setFeatureItems([indexArray[0], subArray])
    }
  }
  randomIndex(data)
  return (
    <FeatureContent 
    heroItem={featureItems[0]}
    subItems={featureItems[1]}
    setSelectedItem={setSelectedItem}>
      <Category categoryData={categoryData} />
    </FeatureContent>
  )
}

Feature.propTypes = {
    data: PropTypes.array,
    setSelectedItem: PropTypes.func,
    categoryData: PropTypes.object,
}

function FeatureContent ({
    heroItem,
    subItems,
    setSelectedItem,
    children,
}) {

  const navigate = useNavigate();
  function eventFunction(item) {
    setSelectedItem(item)
    navigate('/buy')
  }
  return (
    <div className={styles.feature_container}>
      {!heroItem ? <Loading styleName={styles.header_loading}/> 
      : <header  onClick={() => eventFunction(heroItem)} className={styles.header}>
            <div className={styles.image_container}>
              <img className={styles.hero_image} src={heroItem.image} alt={heroItem.title} />
            </div>
            <div className={styles.hero_item_info}>
              <h2 className={styles.hero_item_title}>Latest Drop</h2>
              <h3>{heroItem.title}</h3>
              <p>${heroItem.price}</p>
            </div>
        </header>
      }
      <section>
        <h1 className={styles.titles}>Jump into a Category</h1>
          {children}
      </section>
      <section>          
        <h1 className={styles.titles}>Hottest Items</h1>
        {!subItems ? <Loading styleName={styles.sub_items_load}/>
        : <div className={styles.sub_items}>
            {subItems.map((item => (
                <div className={styles.sub_item} key={item.id} onClick={() => eventFunction(item)}>
                  <div className={styles.sub_image_container}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.sub_item_info}>
                    <h2>{item.title}</h2>
                    <Rating itemRate={item.rating} />
                    <p>${item.price}</p>
                  </div>
                </div>
            )))}
          </div>
        }
      </section>
    </div>
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
    children: PropTypes.element
}

export default Feature