import api from '../utils/api';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKE,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types';
import { setAlert } from './alert';

// Get Posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.get('/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
}

// Get Post
export const getPost = (postId) => async (dispatch) => {
    try {
        const res = await api.get(`/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
}

// Like Post
export const likePost = (postId) => async (dispatch) => {
    try {
        const res = await api.put(`/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKE,
            payload: { postId, likes: res.data }
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
}

// Unlike Post
export const unlikePost = (postId) => async (dispatch) => {
    try {
        const res = await api.put(`/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKE,
            payload: { postId, likes: res.data }
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
}

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.delete(`/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: { postId }
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
}

// Add Post
export const addPost = (formData) => async (dispatch) => {
    try {
        const res = await api.post(`/posts`, formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
}

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/comment/${postId}`, formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
}

// Remove Comment
export const removeComment = (postId, commentId) => async (dispatch) => {
    try {
        await api.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.msg, status: err.response.status }
        });
    }
} 