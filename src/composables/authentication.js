import { request } from '@/composables/backend';
import { useRouter } from 'vue-router'
//import { useVueLs } from 'vue-ls';

/**
 * login
 * 
 * @param {Object} user
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function login(user, callback, errorCallback) {
    request({
        url: 'public/authenticate',
        method: 'POST',
        data: user,
    }, callback, errorCallback);
}

/**
 * logout
 * 
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function logout() {
    localStorage.removeItem('UniTaskPro_jwt');
}

/**
 * is authenticated
 * 
 * @returns {Boolean}
 */
export function isAuthenticated() {
    const jwt = localStorage.getItem('UniTaskPro_jwt');
    return jwt !== null;
}

/**
 * set jwt
 * 
 * @param {String} jwt
 */
export function setJwt(jwt) {
    localStorage.setItem('UniTaskPro_jwt', jwt);
}

/**
 * get username
 * 
 * @returns {String}
 */
export function getUsername() {
    const decodedJwt = getDecodedJwt();
    return decodedJwt.sub;
}

/**
 * get authorities
 * 
 * @returns {Array}
 */
export function getAuthorities() {
    const decodedJwt = getDecodedJwt();
    return decodedJwt.authorities;
}

/**
 * get exp
 * 
 * @returns {Number}
 */
export function getExp() {
    const decodedJwt = getDecodedJwt();
    return decodedJwt.exp;
}

/**
 * Route user if authenticated, to projects
 */
export function routeHomeIfAuthenticated() {
    if (isAuthenticated()) {
        const router = useRouter();
        router.push({ name: 'projects' });
    }
}

/**
 * Route user to login if not authenticated
 */
export function routeLoginIfNotAuthenticated() {
    if (!isAuthenticated()) {
        const router = useRouter();
        router.push({ name: 'login' });
    }
}
    
/**
 * get decoded jwt
 * 
 * @returns {String}
 */
function getDecodedJwt() {
    const jwt = localStorage.getItem('UniTaskPro_jwt');

    // Parse jwt token
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}