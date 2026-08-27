import axios from "axios";
import {
    ALL_BRANCHES_REQUEST,
    ALL_BRANCHES_SUCCESS,
    ALL_BRANCHES_FAIL,
    NEW_BRANCH_REQUEST,
    NEW_BRANCH_SUCCESS,
    NEW_BRANCH_FAIL,
    UPDATE_BRANCH_REQUEST,
    UPDATE_BRANCH_SUCCESS,
    UPDATE_BRANCH_FAIL,
    DELETE_BRANCH_REQUEST,
    DELETE_BRANCH_SUCCESS,
    DELETE_BRANCH_FAIL,
    BRANCH_DETAILS_REQUEST,
    BRANCH_DETAILS_SUCCESS,
    BRANCH_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/branchConstants";

// Get All Branches
export const getAllBranches = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BRANCHES_REQUEST });

        const { data } = await axios.get("/api/v1/branches");

        dispatch({
            type: ALL_BRANCHES_SUCCESS,
            payload: data.branches,
        });
    } catch (error) {
        dispatch({
            type: ALL_BRANCHES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create New Branch
export const createBranch = (branchData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BRANCH_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/admin/branch/new`, branchData, config);

        dispatch({
            type: NEW_BRANCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_BRANCH_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Branch
export const updateBranch = (id, branchData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BRANCH_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/admin/branch/${id}`, branchData, config);

        dispatch({
            type: UPDATE_BRANCH_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BRANCH_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Branch
export const deleteBranch = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BRANCH_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/branch/${id}`);

        dispatch({
            type: DELETE_BRANCH_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_BRANCH_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Branch Details
export const getBranchDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BRANCH_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/branch/${id}`);

        dispatch({
            type: BRANCH_DETAILS_SUCCESS,
            payload: data.branch,
        });
    } catch (error) {
        dispatch({
            type: BRANCH_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
