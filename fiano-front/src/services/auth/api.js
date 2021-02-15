import { toCamel } from '../util'

const FIANO_LOGIN_URL = process.env.NEXT_PUBLIC_FIANO_BACKEND_URL + "/api/token/"
const FIANO_GET_USER_BY_TOKEN_URL = process.env.NEXT_PUBLIC_FIANO_BACKEND_URL + `/api/get-user-by-token`

export function login(username, password) {
    const data = {
        username: username,
        password: password
    }
    return fetch(FIANO_LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((json) => toCamel(json))
}

export function getUser() {
    const token = window.localStorage.getItem('jwt_token')
    return fetch(FIANO_GET_USER_BY_TOKEN_URL, {
        'method': 'GET',
        'Content-Type': 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((json) => toCamel(json))
}

export function getCurrentUser() {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem('current_user')
    }
}

export function getCurrentToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem('jwt_token')
    }
}