
export const URL = 'http://localhost:3000';


export function getToken() {
    return localStorage.getItem('token');
}

export function getstoreduser() {
    try { 
        let user = localStorage.getItem('user');
        if (!user || user === '') return null;
        return user;
    } catch (e) {
        return null;
    }
}


