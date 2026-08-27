import {
    ALL_LOGS_REQUEST,
    ALL_LOGS_SUCCESS,
    ALL_LOGS_FAIL,
    CLEAR_ERRORS,
} from "../constants/logConstants";

export const logsReducer = (state = { logs: [] }, action) => {
    switch (action.type) {
        case ALL_LOGS_REQUEST:
            return {
                loading: true,
                logs: [],
            };
        case ALL_LOGS_SUCCESS:
            return {
                loading: false,
                logs: action.payload,
            };
        case ALL_LOGS_FAIL:
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
