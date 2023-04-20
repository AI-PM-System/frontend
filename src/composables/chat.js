import { request } from '@/composables/backend';

/**
 * Find all chats by project id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByProjectId(id, callback, errorCallback) {
    request({
        url: `user/chats/project/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Find chat by id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/chats/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Find by type and project id.
 * 
 * @param {String} type
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findByTypeAndProjectId(type, id, callback, errorCallback) {
    request({
        url: `user/chats/type/${type}/project/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Create a new chat.
 * 
 * @param {Object} chat
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(chat, callback, errorCallback) {
    request({
        url: 'user/chats',
        method: 'POST',
        data: chat,
    }, callback, errorCallback);
}

/**
 * Update chat.
 * 
 * @param {Number} id
 * @param {Object} chat
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, chat, callback, errorCallback) {
    request({
        url: `user/chats/${id}`,
        method: 'PUT',
        data: chat,
    }, callback, errorCallback);
}