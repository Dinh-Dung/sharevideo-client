import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';
export async function getVideoAndCommentById(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/video/getVideoAndCommentById/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function getVideoToday() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/video/getVideoToday`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function getPrivateVideos(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/video/getPrivateVideos/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function getVideoFollower(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/video/getVideoFollower/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function deleteVideo(videoId) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/video/deleteVideo`, { videoId });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function acceptVideo(videoId) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/video/acceptVideoClient`, { videoId });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function acceptPrivateVideo(videoId) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/video/acceptPrivateVideo`, { videoId });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
