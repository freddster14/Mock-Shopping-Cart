import Loading from "../Route/Loading"
import styles from './Feature.module.css'
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

function Feature ({ 
  featureItems,  
  setSelectedItem 
}) {

    if (!featureItems) {
      return (<Loading />)
    }
    return (
        <>
          {featureItems && 
            <FeatureContent 
            heroItem={featureItems[0]}
            subItems={featureItems[1]}
            setSelectedItem={setSelectedItem}
            />
          }
       
        </>
       
    )
}

Feature.propTypes = {
    items: PropTypes.array,
    featureItems: PropTypes.array,
    setSelectedItem: PropTypes.func
}

function FeatureContent ({
    heroItem,
    subItems,
    setSelectedItem,
}) {

  let navigate = useNavigate();
  function eventFunction(item) {
    setSelectedItem(item)
    navigate('/buy')
  }
    return (
        <>
          <header>
              <div className={styles.hero_item} onClick={() => eventFunction(heroItem)}>
                  <h2 className={styles.hero_item_title}>Latest Drop</h2>
                  <img src={heroItem.image} alt={heroItem.title} />
                  <div className={styles.hero_item_info}>
                    <h3>{heroItem.title}</h3>
                    <p>${heroItem.price}</p>
                  </div>
              </div>
          </header>
          <section>
            {subItems.map((item => (
                <div className={styles.sub_item} key={item.id} onClick={() => eventFunction(item)}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.item_info}>
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>
            )))}
          </section>
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