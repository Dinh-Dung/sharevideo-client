import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';
export async function followUser(me, tiktoker) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/follow/followUser`, { me, tiktoker });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function unfollowUser(me, tiktoker) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/follow/unFollow`, { me, tiktoker });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}

export async function checkUserFollowed(me, tiktoker) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/follow/getActiveFollow`, { me, tiktoker });

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export async function getFollowerOfUser(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/follow/getFollowerOfUser/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
