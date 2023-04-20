import { request } from '@/composables/backend';

/**
 * Find all events by project id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByProjectId(id, callback, errorCallback) {
    request({
        url: `user/events/project/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Find event by id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/events/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Create event.
 * 
 * @param {Object} event
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(event, callback, errorCallback) {
    request({
        url: 'user/events',
        method: 'POST',
        data: event,
    }, callback, errorCallback);
}

/**
 * Update event.
 * 
 * @param {Number} id
 * @param {Object} event
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, event, callback, errorCallback) {
    request({
        url: `user/events/${id}`,
        method: 'PUT',
        data: event,
    }, callback, errorCallback);
}

/**
 * Delete event.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function remove(id, callback, errorCallback) {
    request({
        url: `user/events/${id}`,
        method: 'DELETE',
    }, callback, errorCallback);
}