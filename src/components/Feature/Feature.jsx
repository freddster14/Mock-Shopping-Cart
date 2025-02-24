import Loading from "../Route/Loading"
import  Category  from "./Category"
import Rating from "../Rating/Rating"
import { useLocalStorage } from "../../LocalStorage"
import styles from './Feature.module.css'
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { DataContext } from "../Home Page/Home"

function Feature ({ setSelectedItem, categoryData, }) {
  const [featureItems, setFeatureItems] = useLocalStorage("featureItems", "");
  const { data } = useContext(DataContext)
  useEffect(() => {
    if (!data) {
      setFeatureItems(""); 
      return;
    }

    function getRandomItems(array) {
      if (!array || array.length < 5) return; 

      let indexArray = new Set();
      while (indexArray.size < 5) {
        indexArray.add(array[Math.floor(Math.random() * array.length)]);
      }
      const selectedItems = Array.from(indexArray);
      return [selectedItems[0], selectedItems.slice(1)];
    }

    if (!featureItems) {
      const randomSelection = getRandomItems(data);
      if (randomSelection) {
        setFeatureItems(randomSelection);
      }
    }
  }, [data, featureItems, setFeatureItems]);
  
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
    navigate('/product-page')
    window.scrollTo({
      top:0,
    });
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
              <p>${parseFloat(heroItem.price).toFixed(0)}</p>
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
                    <img className={styles.sub_image} src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.sub_item_info}>
                    <h2>{item.title}</h2>
                    <Rating itemRate={item.rating} />
                    <p>${parseFloat(item.price).toFixed(2)}</p>
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