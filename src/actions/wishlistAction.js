import axios from "axios";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";
import { mockProducts } from "../utils/mockData";

// Add To Wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {
    try {
        // Use mock data instead of API call
        const product = mockProducts.find(p => p._id === id);
        
        if (product) {
            dispatch({
                type: ADD_TO_WISHLIST,
                payload: {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    cuttedPrice: product.cuttedPrice,
                    image: product.images[0].url,
                    ratings: product.ratings,
                    reviews: product.numOfReviews,
                },
            });
        }
    } catch (error) {
        console.error("Error adding to wishlist:", error);
    }

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

// Remove From Wishlist
export const removeFromWishlist = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: id,
    });

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}