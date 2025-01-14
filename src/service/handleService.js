


import axios from 'axios'
import router from '../router'
import store from '../store'
import { actionsTypes } from '../store'

var instance = axios.create()
instance.withCrendentials = true

instance.interceptors.request.use(function (config) {
  config.headers.common['Accept-Language'] = localStorage.getItem('kycloud_lang') || 'en'
  return config
})
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(actionsTypes.HIDE_ALL_MODALS)
          router.push({name: 'login'})
      }
    }
    const result = error.response.data
    const message = result && result.msg || 'Unknow Error'
    window.NotebookVue.$message.error(message)
    return Promise.reject(error.response)
  }
)
 
 export default instance
 