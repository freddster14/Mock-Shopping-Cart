import PropTypes from "prop-types"
import Loading from "../Route/Loading"
import styles from "./Products.module.css"

function Products({ items }) {
    if(!items) return <Loading/>
    return (
      <section>
        <ul className={styles.items_container}>
          {items.map((item) => (
            <li key={item.id} className={styles.item_container}>
              <div className={styles.image_container}>
                <img src={item.image} alt={item.title} className={styles.image} />
              </div>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.rating}></p>
            </li>
           ))}
        </ul>
      </section>
       
    )
}

Products.propTypes = {
    items:  PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,  
    })),
}



function Sort() {
  const [categoryData, setCategoryData] = useLocalStorage("category", "")
 return (
    <>
      {categoryData.map(item => {
        console.log(item)
      })}

    </>
 )
}

export default Products