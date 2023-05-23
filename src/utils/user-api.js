import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';
async function getRandomUsersSuggest() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/user/randomUsersSuggest`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
async function getUserFollowers(id) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/user/getUserFollowers/${id}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
async function getProfileAndVideoByNickname(nickname) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/user/getProfileAndVideoByNickname/${nickname}`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
export { getRandomUsersSuggest, getUserFollowers, getProfileAndVideoByNickname };
