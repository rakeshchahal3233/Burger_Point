import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            return [...state,
            {
                id: action.id, name: action.name, quty: action.quty,
                size: action.size, price: action.price, img: action.img
            }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":     
            let arr = [...state];
            let index = arr.findIndex((food) => food.id === action.id);

            if (index !== -1) {
                // Update the element at the found index
                arr[index] = { ...arr[index], quty: parseInt(action.quty) + arr[index].quty, price: action.price + arr[index].price };
            }
            return arr;

        case "DROP":
            let emptyArray = []
            return emptyArray

        default:
            console.log("Error in reducer");
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch} >
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
