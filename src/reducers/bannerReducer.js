import {
    ALL_BANNERS_REQUEST,
    ALL_BANNERS_SUCCESS,
    ALL_BANNERS_FAIL,
    ADMIN_BANNERS_REQUEST,
    ADMIN_BANNERS_SUCCESS,
    ADMIN_BANNERS_FAIL,
    NEW_BANNER_REQUEST,
    NEW_BANNER_SUCCESS,
    NEW_BANNER_RESET,
    NEW_BANNER_FAIL,
    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_RESET,
    UPDATE_BANNER_FAIL,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_RESET,
    DELETE_BANNER_FAIL,
    BANNER_DETAILS_REQUEST,
    BANNER_DETAILS_SUCCESS,
    BANNER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/bannerConstants';

export const bannersReducer = (state = { banners: [] }, action) => {
    switch (action.type) {
        case ALL_BANNERS_REQUEST:
        case ADMIN_BANNERS_REQUEST:
            return {
                loading: true,
                banners: []
            };
        case ALL_BANNERS_SUCCESS:
        case ADMIN_BANNERS_SUCCESS:
            return {
                loading: false,
                banners: action.payload
            };
        case ALL_BANNERS_FAIL:
        case ADMIN_BANNERS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const newBannerReducer = (state = { banner: {} }, action) => {
    switch (action.type) {
        case NEW_BANNER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case NEW_BANNER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                banner: action.payload.banner
            };
        case NEW_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_BANNER_RESET:
            return {
                ...state,
                success: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const bannerReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BANNER_REQUEST:
        case DELETE_BANNER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case DELETE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case UPDATE_BANNER_FAIL:
        case DELETE_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_BANNER_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case DELETE_BANNER_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const bannerDetailsReducer = (state = { banner: {} }, action) => {
    switch (action.type) {
        case BANNER_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case BANNER_DETAILS_SUCCESS:
            return {
                loading: false,
                banner: action.payload
            };
        case BANNER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
