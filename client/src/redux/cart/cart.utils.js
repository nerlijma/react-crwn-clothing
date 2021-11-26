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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(item => item.id === cartItemToRemove.id);

    let items = [];
    if (existingItem) {
        items = cartItems.map(item => {
            if (item.id === cartItemToRemove.id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return { ...item };
                }
            } else {
                return item;
            }
        })
    }

    return items;
}

// // Methods with Firebase integration
// export const addItemToCartWithDb = (cartItems, userCartItems) => {
//     debugger;
//     const existingItem = cartItems.find(item => item.id === userCartItems.id);

//     let items = [];
//     if (existingItem) {
//         items = cartItems.map(item => {
//             if (item.id === userCartItems.id) {
//                 return { ...item, quantity: item.quantity + 1 };
//             } else {
//                 return item;
//             }
//         })
//     } else {
//         // If does not exits, return same array with new value with quantity = 1
//         items = [...cartItems, { ...userCartItems, quantity: 1 }];
//     }
//     return items;
// }