import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';
export async function searchUser(query, type = 'less') {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/search/users`, {
            params: {
                query,
                type,
            },
        });
        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}
