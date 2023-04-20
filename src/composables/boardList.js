import { request } from '@/composables/backend';

/**
 * Find all board list by board id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByBoardId(id, callback, errorCallback) {
    request({
        url: `user/board-lists/board/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Find board list by id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/board-lists/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Create board list.
 * 
 * @param {Object} boardList
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(boardList, callback, errorCallback) {
    request({
        url: 'user/board-lists',
        method: 'POST',
        data: boardList,
    }, callback, errorCallback);
}

/**
 * Update board list.
 * 
 * @param {Number} id
 * @param {Object} boardList
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, boardList, callback, errorCallback) {
    request({
        url: `user/board-lists/${id}`,
        method: 'PUT',
        data: boardList,
    }, callback, errorCallback);
}

/**
 * Delete board list.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function remove(id, callback, errorCallback) {
    request({
        url: `user/board-lists/${id}`,
        method: 'DELETE',
    }, callback, errorCallback);
}
