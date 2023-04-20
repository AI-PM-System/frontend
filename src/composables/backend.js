//import { useVueLs } from 'vue-ls';

export async function request(_options, callback, errorCallback) {
    const jwt = localStorage.getItem('UniTaskPro_jwt');

    const options = {
      method: _options.method,
      headers: {
        'Content-Type': 'application/json'
      }    
    }
  
    if (_options.data) {
        options.body = JSON.stringify(_options.data);
    }
    
    if (jwt) {
      options.headers['Authorization'] = `Bearer ${jwt}`;
    }

    const response = await fetch(`http://localhost:8080/api/v1/${_options.url}`, options);

    if (response.ok) {
      const data = await response.json();
      callback(data);
    } else {
      const data = await response.json();
      errorCallback(data);
    }
}