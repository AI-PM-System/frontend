import { request } from '@/composables/backend';

/**
 * find all generator actors
 * 
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAll(callback, errorCallback) {
    request({
        url: 'user/generate/actors',
        method: 'GET',
    }, callback, errorCallback);
}
