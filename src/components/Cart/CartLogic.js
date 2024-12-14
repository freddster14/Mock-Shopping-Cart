

function updateCart(cart, item, itemAmount) {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id)
    console.log(itemIndex)
    if (itemIndex === -1) {
        return addToCart(cart, item, itemAmount)
    } else {
        return updateQuantity(cart, itemIndex, itemAmount) 
    }
  }

  function addToCart(cart, item, itemAmount) {
    const newItem = { ...item, value: itemAmount }
    return [...cart, newItem]
  }

  function updateQuantity(cart, index, itemAmount) {
    const newCart = cart.map((cartItem, i) => 
    i === index
      ? { ...cartItem, value: cartItem.value + itemAmount }
      : cartItem
    )
    return newCart
  }



export {updateCart, addToCart, updateQuantity}