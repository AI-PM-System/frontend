import { request } from '@/composables/backend';

/**
 * find me
 * 
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findMe(callback, errorCallback) {
    request({
        url: 'user/me',
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * create me
 * 
 * @param {Object} user
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(user, callback, errorCallback) {
    request({
        url: 'public/user',
        method: 'POST',
        data: user,
    }, callback, errorCallback);
}

/**
 * update me
 * 
 * @param {Object} user
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(user, callback, errorCallback) {
    request({
        url: 'user/me',
        method: 'PUT',
        data: user,
    }, callback, errorCallback);
}