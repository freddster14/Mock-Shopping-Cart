import { useLocalStorage } from "../../LocalStorage"
import Loading from "../Route/Loading"

export default function Category({ data }) {
    const [categoryData, setCategoryData] = useLocalStorage("category", "")
    console.log(data)
    if(!data) return <h1>loading..</h1>
    function categorizeData() {
        let newObj = {};
        for(let n of data) {
            let category = n.category
            !newObj[category] ? newObj[category] = [n]
            : newObj[category].push(n)
        }
        setCategoryData(newObj)
    }
    if(!categoryData) categorizeData()
        console.log(categoryData)
    return (
        <>
           <h1>Categories</h1> 
        </>
    )
}