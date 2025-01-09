import PropTypes from "prop-types"
import { useLocalStorage } from "../../LocalStorage"
import Loading from "../Route/Loading"
import styles from './Category.module.css'
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function capitalizeFirstWord(str) {
    if(!str) return "";
    const words = str.split("");
    words[0] = words[0].toUpperCase()
    return words.join("");
}

export function Category({ categoryData, setDisplayItems }) {
    const location = useLocation();
    const navigate = useNavigate();
    const homePage = location.pathname === "/";

    function jumpToCategory(category) {
        if(homePage) { navigate('/products') } 
        setDisplayItems(categoryData[category]);
    }

    if(!categoryData) return <Loading styleName={styles.categories}/>
    return (
        <div className={homePage? styles.categories : styles.small_categories}>
            {Object.keys(categoryData).map(category => (
                <div 
                key={category} 
                className={styles.category}>
                    <button 
                    className={homePage ? styles.button_big : styles.button_small}
                    onClick={() => jumpToCategory(category)}
                    >
                    {capitalizeFirstWord(category)}
                    </button>
                    { homePage &&
                        <div className={styles.image_container}>
                            <img 
                            className={styles.image}
                            src={categoryData[category][1].image} 
                            alt={categoryData[category][1].title}
                            />
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

Category.propType = {
    data: PropTypes.object,
}