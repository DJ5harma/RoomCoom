import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set')
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Add request interceptor to dynamically set Authorization header
axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('auth_token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle 401 errors (expired/invalid tokens)
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear the auth token cookie
    //   Cookies.remove('auth_token', { path: '/' })
      
      // Only redirect if we're not already on the login page
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth/login')) {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  },
)

export const Api = axiosInstance