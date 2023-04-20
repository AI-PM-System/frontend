import { request } from '@/composables/backend';

/**
 * find all members by project id
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findAllByProjectId(id, callback, errorCallback) {
    request({
        url: `user/members/project/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * find member by id
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
    request({
        url: `user/members/${id}`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * find authorized member by project id
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findMyMemberByProjectId(id, callback, errorCallback) {
    request({
        url: `user/members/project/${id}/me`,
        method: 'GET',
    }, callback, errorCallback);
}

/**
 * create member
 * 
 * @param {Object} member
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function create(member, callback, errorCallback) {
    request({
        url: 'user/members',
        method: 'POST',
        data: member,
    }, callback, errorCallback);
}

/**
 * update member
 * 
 * @param {Number} id
 * @param {Object} member
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, member, callback, errorCallback) {
    request({
        url: `user/members/${id}`,
        method: 'PUT',
        data: member,
    }, callback, errorCallback);
}

/**
 * delete member
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function remove(id, callback, errorCallback) {
    request({
        url: `user/members/${id}`,
        method: 'DELETE',
    }, callback, errorCallback);
}
