import {
    ALL_GST_REQUEST,
    ALL_GST_SUCCESS,
    ALL_GST_FAIL,
    NEW_GST_REQUEST,
    NEW_GST_SUCCESS,
    NEW_GST_RESET,
    NEW_GST_FAIL,
    UPDATE_GST_REQUEST,
    UPDATE_GST_SUCCESS,
    UPDATE_GST_RESET,
    UPDATE_GST_FAIL,
    DELETE_GST_REQUEST,
    DELETE_GST_SUCCESS,
    DELETE_GST_RESET,
    DELETE_GST_FAIL,
    CLEAR_ERRORS,
} from '../constants/gstConstants';

export const gstsReducer = (state = { gsts: [] }, action) => {
    switch (action.type) {
        case ALL_GST_REQUEST:
            return {
                loading: true,
                gsts: [],
            };
        case ALL_GST_SUCCESS:
            return {
                loading: false,
                gsts: action.payload,
            };
        case ALL_GST_FAIL:
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

export const newGstReducer = (state = { gst: {} }, action) => {
    switch (action.type) {
        case NEW_GST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_GST_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                gst: action.payload.gst,
            };
        case NEW_GST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_GST_RESET:
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

export const gstReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_GST_REQUEST:
        case DELETE_GST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_GST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_GST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_GST_FAIL:
        case DELETE_GST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_GST_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_GST_RESET:
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
