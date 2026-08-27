import axios from 'axios';
import {
    ALL_BANNERS_REQUEST,
    ALL_BANNERS_SUCCESS,
    ALL_BANNERS_FAIL,
    ADMIN_BANNERS_REQUEST,
    ADMIN_BANNERS_SUCCESS,
    ADMIN_BANNERS_FAIL,
    NEW_BANNER_REQUEST,
    NEW_BANNER_SUCCESS,
    NEW_BANNER_FAIL,
    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_FAIL,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,
    BANNER_DETAILS_REQUEST,
    BANNER_DETAILS_SUCCESS,
    BANNER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/bannerConstants';

// Get All Active Banners (Public)
export const getBanners = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BANNERS_REQUEST });

        const { data } = await axios.get('/api/v1/banners');

        dispatch({
            type: ALL_BANNERS_SUCCESS,
            payload: data.banners,
        });
    } catch (error) {
        dispatch({
            type: ALL_BANNERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Banners (Admin)
export const getAdminBanners = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_BANNERS_REQUEST });

        const { data } = await axios.get('/api/v1/admin/banners');

        dispatch({
            type: ADMIN_BANNERS_SUCCESS,
            payload: data.banners,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_BANNERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create Banner (Admin)
export const createBanner = (bannerData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BANNER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post('/api/v1/admin/banner/new', bannerData, config);

        dispatch({
            type: NEW_BANNER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_BANNER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Banner (Admin)
export const updateBanner = (id, bannerData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BANNER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.put(`/api/v1/admin/banner/${id}`, bannerData, config);

        dispatch({
            type: UPDATE_BANNER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BANNER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Banner (Admin)
export const deleteBanner = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BANNER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);

        dispatch({
            type: DELETE_BANNER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_BANNER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Banner Details (Admin)
export const getBannerDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BANNER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/banner/${id}`);

        dispatch({
            type: BANNER_DETAILS_SUCCESS,
            payload: data.banner,
        });
    } catch (error) {
        dispatch({
            type: BANNER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
