import axios from 'axios';
import {
    ALL_GST_REQUEST,
    ALL_GST_SUCCESS,
    ALL_GST_FAIL,
    NEW_GST_REQUEST,
    NEW_GST_SUCCESS,
    NEW_GST_FAIL,
    UPDATE_GST_REQUEST,
    UPDATE_GST_SUCCESS,
    UPDATE_GST_FAIL,
    DELETE_GST_REQUEST,
    DELETE_GST_SUCCESS,
    DELETE_GST_FAIL,
    CLEAR_ERRORS,
} from '../constants/gstConstants';

// Get All GSTs
export const getAdminGsts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_GST_REQUEST });

        const { data } = await axios.get('/api/v1/gsts');

        dispatch({
            type: ALL_GST_SUCCESS,
            payload: data.gsts,
        });
    } catch (error) {
        dispatch({
            type: ALL_GST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create New GST
export const createGst = (gstData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_GST_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/admin/gst/new`, gstData, config);

        dispatch({
            type: NEW_GST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_GST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update GST
export const updateGst = (id, gstData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_GST_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/admin/gst/${id}`, gstData, config);

        dispatch({
            type: UPDATE_GST_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_GST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete GST
export const deleteGst = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_GST_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/gst/${id}`);

        dispatch({
            type: DELETE_GST_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_GST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
