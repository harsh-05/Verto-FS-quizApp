
export const URL = "http://localhost:3000";


export function getToken() {
    return localStorage.getItem('token');
}

export function getstoreduser() {
    try { 
        let user = localStorage.getItem('user');
        if (!user || user === '') return null;
        return JSON.parse(user);
    } catch (e) {
        return null;
    }
}


