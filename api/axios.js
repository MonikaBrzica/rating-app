import axios from 'axios'
// creating HTTP object that can be expanded and used in the app.
export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})
