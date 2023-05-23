import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';
export async function uploadVideoToCloud(formData) {
    try {
        const { data } = await axios.post(`${BASE_URL}/video/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    } catch (error) {
        return null;
    }
}

export async function getVideoList() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/video/getList`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function getUserVideoList(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/video/getUserVideoList/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
