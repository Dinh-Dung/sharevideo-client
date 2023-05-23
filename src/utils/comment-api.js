import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';
export async function getComment(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/comment/getCommentVideo/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function Comment(userId, videoId, commentText) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/comment/commentVideo`, {
            userId,
            videoId,
            commentText,
        });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function deleteComment(userId, videoId, commentId) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/comment/deleteComment`, {
            userId,
            videoId,
            commentId,
        });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
