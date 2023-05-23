import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';

async function login(username, password) {
    try {
        const { data, error } = await axios.post(`${BASE_URL}/user/login`, { username, password });

        if (!data || error) throw new Error();

        return {
            access_token: data.data.access_token,
            refresh_token: data.data.refresh_token,
        };
    } catch (error) {
        return {
            access_token: null,
        };
    }
}

async function refreshToken(token) {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/user/refresh-token?token=` + token);

        if (!data || error) throw new Error();

        return {
            access_token: data.data.access_token,
        };
    } catch (error) {
        return {
            access_token: null,
        };
    }
}

async function getUser() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/user/getProfile`);
        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return null;
    }
}

async function getAllUser() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/user/getAllUser`);
        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return null;
    }
}

async function signUp(newUser) {
    try {
        const { data } = await axios.post(`${BASE_URL}/user/register`, newUser);

        if (!data) throw new Error();
        return data.data;
    } catch (error) {
        return null;
    }
}

export { login, signUp, getAllUser, refreshToken, getUser };
