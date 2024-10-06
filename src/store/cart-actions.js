import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

//action creator
export const sendCartData = (cart) => {
    return (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: 'pending',
              title: 'Sending...',
              message: 'Sending cart data!',
            })
          );
        

        try{
            localStorage.setItem('cart', JSON.stringify(cart))

            dispatch(
                uiActions.showNotification({
                  status: 'success',
                  title: 'Success!',
                  message: 'Sent cart data successfully!',
                })
              );

        }catch(error){
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Sending cart data failed!',
                })
              );
        }    
    }
}


export const fetchCartData = () => {
    return dispatch => {
        
        try{
            const cartData = localStorage.getItem('cart')
            const parsedCartData = JSON.parse(cartData)
            dispatch(cartActions.replaceCart({
                items: parsedCartData.items || [],
                totalQuantity: parsedCartData.totalQuantity
            }))
        }catch(error){
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Fetching cart data failed!',
                })
              );
        }
    }
}