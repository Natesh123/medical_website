import axios from "axios";
import {
    ALL_LOGS_REQUEST,
    ALL_LOGS_SUCCESS,
    ALL_LOGS_FAIL,
    CLEAR_ERRORS,
} from "../constants/logConstants";

// Get All Logs
export const getAllLogs = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_LOGS_REQUEST });

        const { data } = await axios.get("/api/v1/admin/logs");

        dispatch({
            type: ALL_LOGS_SUCCESS,
            payload: data.logs,
        });
    } catch (error) {
        dispatch({
            type: ALL_LOGS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
