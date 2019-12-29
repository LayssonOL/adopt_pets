import axios, { AxiosRequestConfig } from 'axios';

import { getAccessKey, getUserToken, _API_KEY_ } from './auth';

const sessionRequest = axios.create({
	baseURL: 'https://test.adopets.app/v1/auth'
});

sessionRequest.interceptors.request.use((config: AxiosRequestConfig) => {
	config.data = {
		system_api_key: _API_KEY_
	};
	return config;
});

const sessionRegister = axios.create({
	baseURL: 'https://test.adopets.app/v1/auth'
});

sessionRegister.interceptors.request.use(async (config: AxiosRequestConfig) => {
	const access_token = getAccessKey();
	if (access_token) {
		config.headers.Authorization = `Bearer ${access_token}`;
	}
	return config;
});

const petSearch = axios.create({
	baseURL: 'https://test.adopets.app/v1'
});

petSearch.interceptors.request.use(async (config: AxiosRequestConfig) => {
	const user_token = getUserToken();
	if (user_token) {
		config.headers.Authorization = `Bearer ${user_token}`;
	}
	return config;
});

export { sessionRequest, sessionRegister, petSearch };
