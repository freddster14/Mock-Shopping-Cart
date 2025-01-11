import PropTypes from "prop-types"
import { useLocalStorage } from "../../LocalStorage"
import Loading from "../Route/Loading"
import styles from './Category.module.css'
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

export function capitalizeFirstWord(str) {
    if(!str) return "";
    const words = str.split("");
    words[0] = words[0].toUpperCase()
    return words.join("");
}


export function Category({ categoryData, setDisplayItems, items }) {
    const location = useLocation();
    const { category } = useParams()
    const homePage = location.pathname === "/";

    
    

    if(!categoryData) return <Loading styleName={styles.categories}/>

    return (
        <div className={homePage ? styles.categories : styles.small_categories}>
            {Object.keys(categoryData).map(category => (
                <div 
                key={category} 
                className={styles.category}>
                    <NavLink to={`products/${category}`}
                    className={({ isActive }) => 
                        `${isActive ? styles.active : ""} 
                        ${homePage ? styles.button_big : styles.button_small}`
                        .trim()
                    }
                    >   
                        { capitalizeFirstWord(category)}
                        { homePage &&
                            <div className={styles.image_container}>
                                <img 
                                className={styles.image}
                                src={categoryData[category][1].image} 
                                alt={categoryData[category][1].title}
                                />
                            </div>
                        }
                    </NavLink>
                </div>
            ))}
            { !homePage &&
            <>
            <NavLink to="products" 
            className={({ isActive }) => 
                `${isActive ? styles.active : ""} 
                ${homePage ? styles.button_big : styles.button_small}`
                .trim()
            }
                end>All</NavLink>
            
            </>
            
            }
        </div>
    )
}

Category.propType = {
    data: PropTypes.object,
}