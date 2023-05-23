import axios from 'axios';
import { BASE_URL } from '~/constants/base-url';

async function getCategoryList() {
    try {
        const { data, error } = await axios.get(`${BASE_URL}/category/getList`);

        if (!data || error) throw new Error();

        return data.data;
    } catch (error) {
        return [];
    }
}

export { getCategoryList };
