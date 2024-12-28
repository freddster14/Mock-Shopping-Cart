import PropTypes from "prop-types"
import { useLocalStorage } from "../../LocalStorage"
import Loading from "../Route/Loading"
import styles from './Category.module.css'
import { useEffect } from "react";

function capitalizeFirstWord(str) {
    if(!str) return "";
    const words = str.split("");
    words[0] = words[0].toUpperCase()
    return words.join("");
}

export default function Category({ data }) {
    const [categoryData, setCategoryData] = useLocalStorage("category", "")
    
    useEffect(() => {
        if(!data) setCategoryData("")
    }, [data, setCategoryData])

    function categorizeData(data) {
        if(data && !categoryData) {
          let newObj = {};
          data.forEach(item => {
          const category = item.category
            if(!newObj[category]) {
              newObj[category] = []
            }
            newObj[category].push(item)
        });
        setCategoryData(newObj)
        } 
    }

    categorizeData(data)
    if(!categoryData) return <Loading styleName={styles.categories}/>

    return (
        <div className={styles.categories}>
            {Object.keys(categoryData).map(category => (
                <div key={category} className={styles.category}>
                    <h2>{capitalizeFirstWord(category)}</h2>
                    <div className={styles.image_container}>
                        <img 
                        className={styles.image}
                        src={categoryData[category][1].image} 
                        alt={categoryData[category][1].title}
                        />
                    </div>  
                </div>
        ))}
        </div>
    )
}

Category.propType = {
    data: PropTypes.object,
}