import { request } from '@/composables/backend';

/**
 * find all projects
 * 
 * @param {Function} callback 
 * @param {Function} errorCallback
 */
export function findAll(callback, errorCallback) {
  request({
    url: 'user/projects',
    method: 'GET',
  }, callback, errorCallback);
}

/**
 * find project by id
 * 
 * @param {Number} id
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function findById(id, callback, errorCallback) {
  request({
    url: `user/projects/${id}`,
    method: 'GET',
  }, callback, errorCallback);
}

/**
 * update project
 * 
 * @param {Number} id
 * @param {Object} project
 * @param {Function} callback
 * @param {Function} errorCallback
 */
export function update(id, project, callback, errorCallback) {
  request({
    url: `user/projects/${id}`,
    method: 'PUT',
    data: project,
  }, callback, errorCallback);
}




