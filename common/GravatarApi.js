import axios from 'axios'

export const GravatarApi = axios.create({
  baseURL: 'https://en.gravatar.com'
})
