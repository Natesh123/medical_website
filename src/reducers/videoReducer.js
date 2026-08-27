import {
    NEW_VIDEO_REQUEST,
    NEW_VIDEO_SUCCESS,
    NEW_VIDEO_RESET,
    NEW_VIDEO_FAIL,
    GET_VIDEOS_REQUEST,
    GET_VIDEOS_SUCCESS,
    GET_VIDEOS_FAIL,
    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_SUCCESS,
    DELETE_VIDEO_RESET,
    DELETE_VIDEO_FAIL,
    CLEAR_ERRORS,
} from "../constants/videoConstants";

export const videosReducer = (state = { videos: [] }, action) => {
    switch (action.type) {
        case GET_VIDEOS_REQUEST:
            return {
                loading: true,
                videos: [],
            };
        case GET_VIDEOS_SUCCESS:
            return {
                loading: false,
                videos: action.payload,
            };
        case GET_VIDEOS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newVideoReducer = (state = { video: {} }, action) => {
    switch (action.type) {
        case NEW_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_VIDEO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                video: action.payload.video,
            };
        case NEW_VIDEO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_VIDEO_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const deleteVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_VIDEO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_VIDEO_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
