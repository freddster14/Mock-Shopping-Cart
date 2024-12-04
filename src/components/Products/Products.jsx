function Products({ items }) {
    return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
           ))}
        </ul>
       
    )
}

export default Products