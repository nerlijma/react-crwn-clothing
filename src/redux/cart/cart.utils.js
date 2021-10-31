export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingItem = cartItems.find(item => item.id === cartItemToAdd.id);

    let items = [];
    if (existingItem) {
        items = cartItems.map(item => {
            if (item.id === cartItemToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }
        })
    } else {
        // If does not exits, return same array with new value with quantity = 1
        items = [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    }
    return items;
}