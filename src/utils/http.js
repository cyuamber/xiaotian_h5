import axios from 'axios'
import Qs from 'qs'
const defaultHeaders = () => ({
  'Content-Type': 'application/json'
  // "Access-Control-Allow-Origin": "*",
  // "Access-Control-Allow-Headers": "x-requested-with,content-type",
})

// create axios instance
const http = axios.create({
  baseURL: '',
  // withCredentials: true, // set cross-origin
  crossDomain: true,
  timeout: 10000
})

axios.defaults.transformRequest = [function(data, config) {
  if (!config['Content-Type']) return Qs.stringify(data);
  switch (config['Content-Type'].toLowerCase()) {
    case 'application/json;charset=utf-8': {
      return JSON.stringify(data)
    }
    case 'multipart/formdata;charset=utf-8': {
      return data
    }
    default: {
      return Qs.stringify(data)
    }
  }
}]

export function axiosGet(url, params, data, headers) {
  return new Promise((resolve, reject) => {
    http({
      method: 'GET',
      url: url,
      params: params,
      headers: headers || defaultHeaders()
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
export function axiosPost(url, params, data, headers) {
  return new Promise((resolve, reject) => {
    http({
      method: 'POST',
      url: url,
      params: params,
      data: data,
      headers: headers || defaultHeaders()
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
export function axiosPut(url, params, data, headers) {
  return new Promise((resolve, reject) => {
    http({
      method: 'PUT',
      url: url,
      params: params,
      data: data,
      headers: headers || defaultHeaders()
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
export function axiosDelete(url, params, data, headers) {
  return new Promise((resolve, reject) => {
    http({
      method: 'DELETE',
      url: url,
      params: params,
      headers: headers || defaultHeaders()
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
