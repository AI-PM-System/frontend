import { request } from '@/composables/backend';

/**
 * Find all messages by chat id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByChatId(id, callback, errorCallback) {
    request({
        url: `user/messages/chat/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Find by id
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/messages/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Create a new message.
 * 
 * @param {Object} message
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(message, callback, errorCallback) {
    request({
        url: 'user/messages',
        method: 'POST',
        data: message,
    }, callback, errorCallback);
}

/**
 * Update a message.
 * 
 * @param {Number} id
 * @param {Object} message
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, message, callback, errorCallback) {
    request({
        url: `user/messages/${id}`,
        method: 'PUT',
        data: message,
    }, callback, errorCallback);
}

/**
 * Delete a message.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function destroy(id, callback, errorCallback) {
    request({
        url: `user/messages/${id}`,
        method: 'DELETE',
    }, callback, errorCallback);
}

