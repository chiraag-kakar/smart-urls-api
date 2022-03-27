import api from '../config/axios';

const Api = {
  signup: (body:any) => api.post('/api/auth/signup', body),
  login: (body:any) => api.post('/api/auth/login', body),
  quickShorten: (body:any) => api.post('/api/url/quick_create', body),
  createShorUrl: (body:any) => api.post('/api/url/create', body),
  redirect: (shortUrl:any) => api.put(`/api/url/redirect/${shortUrl}`),
  getDashboard: () => api.get('/api/url/dashboard'),
  searchUrl: (longUrl:any) => api.get('/api/url/search', { params: { longUrl } }),
  deleteUrl: (id:any) => api.delete(`/api/url/delete/${id}`),
};

export default Api;