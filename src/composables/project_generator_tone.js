import { request } from '@/composables/backend';

/**
 * find all generator tones
 * 
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAll(callback, errorCallback) {
    request({
        url: 'user/generate/tones',
        method: 'GET',
    }, callback, errorCallback);
}
