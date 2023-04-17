// fetch.js

export function useFetch(url : string, options : any, callback : Function) : any {
  options.headers = {
    'Content-Type': 'application/json'
  }

  fetch(new URL(url), options)
    .then((res) => res.json())
    .then((json) => callback(json))
    .catch((err) => console.log(err))  
}

export function useFetchAuth(url : string, jwt : string, options : any, callback : Function) : any {
  options.headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwt}`
  }

  fetch(new URL(url), options)
    .then((res) => res.json())
    .then((json) => callback(json))
    .catch((err) => console.log(err))  
}