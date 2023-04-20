import { request } from '@/composables/backend';

/**
 * Creates a new project generator.
 * 
 * @param {Object} generatorRequest
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(generatorRequest, callback, errorCallback) {
    request({
        url: 'user/generate/project/new',
        method: 'POST',
        data: generatorRequest,
    }, callback, errorCallback);
}

/**
 * Proceed the conversation with the project generator.
 * 
 * @param {Object} generatorRequest
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function proceed(generatorRequest, callback, errorCallback) {
    request({
        url: 'user/generate/project/proceed',
        method: 'POST',
        data: generatorRequest,
    }, callback, errorCallback);
}

/**
 * Cancels the project generator.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function cancel(id, callback, errorCallback) {
    request({
        url: `user/generate/project/force-complete/${id}`,
        method: 'POST',
    }, callback, errorCallback);
}

/**
 * Get any generator that is not completed.
 * 
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function getAnyIncomplete(callback, errorCallback) {
    request({
        url: 'user/generate/project/incomplete',
        method: 'GET',
    }, callback, errorCallback);
}