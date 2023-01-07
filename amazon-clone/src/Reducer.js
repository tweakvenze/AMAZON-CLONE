export const initialState = {
    basket: [],
    user: "Hello Guest",
    popup: false,
}

// export const getBasketTotal = (basket) => 
// basket?.reduce((amount, item) => item.productPrice + amount, 0);

export const getBasketTotal = (basket) => {
    let total = 0;
    basket.map(item => {
        total = total + item.productPrice;
    })
    return Math.round(total * 100) / 100;
}

const reducer = (state, action) => {
   //console.log(action);
    switch (action.type) 
    {
        case "ADD_TO_BASKET":
        return{
            ...state,
            basket: [...state.basket, action.item],
        };
        
        case "REMOVE_FROM_BASKET":

            let newBasket = [...state.basket];
            //Here we find the item index
            let index = state.basket.findIndex(
                basketItem => basketItem.id === action.id
            );

            if(index >= 0)
            {
                //Delete the item at that index
                newBasket.splice(index, 1);
            }
            else{
                console.warn("Not possible");
            }
            
            //Returning the updated basket
            return{
                ...state,
                basket: newBasket,
            };

        case "SET_USER":
            return{
                ...state,
                user: action.user,
            }
        
        case "EMPTY_BASKET":
        return{
            ...state,
            basket: [],
        }

        case "SET_POP_UP":
        return{
            ...state,
            popup: !(state.popup),
        }
        default:
            return state;
    }
}

export default reducer;