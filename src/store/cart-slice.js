import { createSlice } from "@reduxjs/toolkit";


const data = localStorage.getItem('cart')
const data1 = data ? JSON.parse(data) : ''



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: data1.items ? data1.items : [],
        totalQuantity: data1.totalQuantity ? data1.totalQuantity : 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action){
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
            state.changed = true

            if(!existingItem){
                state.items.push({id: newItem.id, quantity: 1, name: newItem.title}) 
                //'mutating' the existing state is available with Redux Toolkit only! 
            }else{
                existingItem.quantity++
            }
        },
        removeItemFromCart(state, action){
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--
            state.changed = true

            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id)
            }else{
                existingItem.quantity--
                
            }
        }
    }
})


export const cartActions = cartSlice.actions

export default cartSlice