import axios from "axios";
import {
    NEW_VIDEO_REQUEST,
    NEW_VIDEO_SUCCESS,
    NEW_VIDEO_FAIL,
    GET_VIDEOS_REQUEST,
    GET_VIDEOS_SUCCESS,
    GET_VIDEOS_FAIL,
    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_SUCCESS,
    DELETE_VIDEO_FAIL,
    CLEAR_ERRORS,
} from "../constants/videoConstants";

// Get All Videos
export const getVideos = () => async (dispatch) => {
    try {
        dispatch({ type: GET_VIDEOS_REQUEST });

        const { data } = await axios.get("/api/v1/videos");

        dispatch({
            type: GET_VIDEOS_SUCCESS,
            payload: data.videos,
        });
    } catch (error) {
        dispatch({
            type: GET_VIDEOS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Add New Video (Admin)
export const addVideo = (videoData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_VIDEO_REQUEST });

        const isFormData = videoData instanceof FormData;
        const config = {
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            }
        };

        const { data } = await axios.post("/api/v1/admin/video/new", videoData, config);

        dispatch({
            type: NEW_VIDEO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_VIDEO_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Video (Admin)
export const deleteVideo = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_VIDEO_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/video/${id}`);

        dispatch({
            type: DELETE_VIDEO_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_VIDEO_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
