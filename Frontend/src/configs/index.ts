
export function getToken() {
    return localStorage.getItem('token');
}

export function getstoredser() {
    try { 
        let user = localStorage.getItem('user');
        if (!user || user === '') return null;
        return JSON.parse(user);
    } catch (e) {
        return null;
    }
}


