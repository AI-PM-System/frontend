import { request } from '@/composables/backend';

/**
 * find all roles by project id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByProjectId(id, callback, errorCallback) {
    request({
        url: `user/roles/project/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * find role by id.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/roles/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * create role.
 * 
 * @param {Object} role
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(role, callback, errorCallback) {
    request({
        url: 'user/roles',
        method: 'POST',
        data: role,
    }, callback, errorCallback);
}

/**
 * update role.
 * 
 * @param {Number} id
 * @param {Object} role
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, role, callback, errorCallback) {
    request({
        url: `user/roles/${id}`,
        method: 'PUT',
        data: role,
    }, callback, errorCallback);
}

/**
 * delete role.
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function remove(id, callback, errorCallback) {
    request({
        url: `user/roles/${id}`,
        method: 'DELETE',
    }, callback, errorCallback);
}