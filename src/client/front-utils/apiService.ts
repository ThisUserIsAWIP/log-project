export interface IFetchOptions {
	method: string;
	headers?: HeadersInit;
	body?: string;
}

export const TOKEN_KEY = 'TOKEN';

export async function apiService<T = any>(uri: string, method: string = 'GET', data?: {}) {
    const TOKEN = localStorage.getItem(TOKEN_KEY);
    const headers: HeadersInit = {};
    const fetchOptions: IFetchOptions = {
        method,
        headers
    };
    if (TOKEN) {
        headers['Authorization'] = `Bearer ${TOKEN}`;
    }

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(data);
    }
    try {
        console.log(uri, fetchOptions)
        const res = await fetch(uri, fetchOptions);
        console.log(res)
        if (res.status === 400) {
            throw new Error('check fetch options')
        }
        if (res.status == 401) {
            throw new Error('no token, expired token, or server could not validate token')
        }
        if (res.status === 404) {
			throw new Error('the server endpoint path was not found');
		}

		if (res.status === 500) {
			throw new Error('server blew up, check the terminal logs');
		}
        if (res.ok) {
            return <T>await res.json();
        }
    } catch {Error} {
        console.log(Error);
        throw Error;
    }
}