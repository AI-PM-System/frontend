import { request } from '@/composables/backend';

/**
 * Find all tasks by board list id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByBoardListId(id, callback, errorCallback) {
    request({
        url: `user/tasks/board-list/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Find task by id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/tasks/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * Create task.
 * 
 * @param {Object} task
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(task, callback, errorCallback) {
    request({
        url: 'user/tasks',
        method: 'POST',
        data: task,
    }, callback, errorCallback);
}

/**
 * Update task.
 * 
 * @param {Number} id
 * @param {Object} task
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, task, callback, errorCallback) {
    request({
        url: `user/tasks/${id}`,
        method: 'PUT',
        data: task,
    }, callback, errorCallback);
}

/**
 * Delete task.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function remove(id, callback, errorCallback) {
    request({
        url: `user/tasks/${id}`,
        method: 'DELETE',
    }, callback, errorCallback);
}
