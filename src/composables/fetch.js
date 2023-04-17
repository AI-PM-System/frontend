// fetch.js

export function useFetch(url, options = {method: 'GET'}, callback) {

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => callback(json))
    .catch((err) => console.log(err))  
}