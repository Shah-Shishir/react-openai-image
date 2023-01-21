import axios from 'axios';

import { BASE_URL as baseUrl } from "../constants/constant";

export const post = (url, data) => axios.post(`${baseUrl}/${url}`, data);