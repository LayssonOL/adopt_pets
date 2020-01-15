export const _API_KEY_ = process.env.API_KEY;

export const access = (key: string) => {
	localStorage.setItem('_ACCESS_KEY_', key);
};

export const getAccessKey = () => localStorage.getItem('_ACCESS_KEY_');

export const isSessionOpened = () => localStorage.getItem('_ACCESS_KEY_') !== null;

export const getUserToken = () => localStorage.getItem('_USER_ACCESS_KEY_');

export const userIsAuthenticated = () => localStorage.getItem('_USER_ACCESS_KEY_') !== null;

export const login = (token: string) => {
	localStorage.setItem('_USER_ACCESS_KEY_', token);
};

export const logout = () => {
	localStorage.removeItem('_USER_ACCESS_KEY_');
	localStorage.removeItem('_ACCESS_KEY_');
};
