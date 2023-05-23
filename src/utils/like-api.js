import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';
export async function likeCountOfVideo(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/like/getLikeCount/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function likeVideo(videoId, userId) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/like/likeVideo`, { userId, videoId });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function unlikeVideo(videoId, userId) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/like/unlike`, { userId, videoId });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function userLiked(videoId, userId) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/like/getActiveLike`, { userId, videoId });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return false;
    }
}
