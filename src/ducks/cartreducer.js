const initialState = {
    cart: []
}

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
// const DELETE_FROM_CART = 'DELETE_FROM_CART'
const DELETE_ITEM = 'DELETE_ITEM'

export function getCart (cart){
    return{
    type: GET_CART,
    payload: cart,
    }
}


export function addToCart (cart){
    return{
        type: ADD_TO_CART,
        payload: cart,
    }
}

// export function deleteFromCart(){
//     return{
//         type: DELETE_FROM_CART,
//         payload: initialState,
//     }
// }

export function deleteItem(cart){
    return{
        type: DELETE_ITEM,
        payload: cart,
    }
}


export default function (state = initialState, action){
    switch (action.type) {
        case GET_CART:
            return{
                ...state, cart: action.payload
            }
        case ADD_TO_CART:
            return {...state, cart: [...state.cart, ...action.payload]}
        // case DELETE_FROM_CART:
        //     return{...state, ...action.payload}
        case DELETE_ITEM:
            return{...state, cart: action.payload}
         default: 
            return state
    }

    
}