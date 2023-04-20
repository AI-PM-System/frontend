import { request } from '@/composables/backend';

/**
 * Find all boards by project id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByProjectId(id, callback, errorCallback) {
    request({
        url: `user/boards/project/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Find board by id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/boards/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Create board.
 * 
 * @param {Object} board
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(board, callback, errorCallback) {
    request({
        url: 'user/boards',
        method: 'POST',
        data: board,
    }, callback, errorCallback);
}

/**
 * Update board.
 * 
 * @param {Number} id
 * @param {Object} board
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, board, callback, errorCallback) {
    request({
        url: `user/boards/${id}`,
        method: 'PUT',
        data: board,
    }, callback, errorCallback);
}

/**
 * Delete board.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function remove(id, callback, errorCallback) {
    request({
        url: `user/boards/${id}`,
        method: 'DELETE',
    }, callback, errorCallback);
}
