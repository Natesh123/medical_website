import {
    ALL_BRANCHES_REQUEST,
    ALL_BRANCHES_SUCCESS,
    ALL_BRANCHES_FAIL,
    NEW_BRANCH_REQUEST,
    NEW_BRANCH_SUCCESS,
    NEW_BRANCH_RESET,
    NEW_BRANCH_FAIL,
    UPDATE_BRANCH_REQUEST,
    UPDATE_BRANCH_SUCCESS,
    UPDATE_BRANCH_RESET,
    UPDATE_BRANCH_FAIL,
    DELETE_BRANCH_REQUEST,
    DELETE_BRANCH_SUCCESS,
    DELETE_BRANCH_RESET,
    DELETE_BRANCH_FAIL,
    BRANCH_DETAILS_REQUEST,
    BRANCH_DETAILS_SUCCESS,
    BRANCH_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/branchConstants";

export const branchesReducer = (state = { branches: [] }, action) => {
    switch (action.type) {
        case ALL_BRANCHES_REQUEST:
            return {
                loading: true,
                branches: [],
            };
        case ALL_BRANCHES_SUCCESS:
            return {
                loading: false,
                branches: action.payload,
            };
        case ALL_BRANCHES_FAIL:
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

export const newBranchReducer = (state = { branch: {} }, action) => {
    switch (action.type) {
        case NEW_BRANCH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_BRANCH_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                branch: action.payload.branch,
            };
        case NEW_BRANCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_BRANCH_RESET:
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

export const branchReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BRANCH_REQUEST:
        case UPDATE_BRANCH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_BRANCH_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_BRANCH_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_BRANCH_FAIL:
        case UPDATE_BRANCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_BRANCH_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_BRANCH_RESET:
            return {
                ...state,
                isUpdated: false,
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

export const branchDetailsReducer = (state = { branch: {} }, action) => {
    switch (action.type) {
        case BRANCH_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case BRANCH_DETAILS_SUCCESS:
            return {
                loading: false,
                branch: action.payload,
            };
        case BRANCH_DETAILS_FAIL:
            return {
                ...state,
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
