import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const filiereAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/filieres`),
  getById: (id) => axios.get(`${API_BASE_URL}/filieres/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/filieres`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/filieres/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/filieres/${id}`),
};

export const classAPI = {
  getAll: (params) => axios.get(`${API_BASE_URL}/classes`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/classes/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/classes`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/classes/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/classes/${id}`),
  addStudent: (classId, studentId) =>
    axios.post(`${API_BASE_URL}/classes/${classId}/students`, { studentId }),
  removeStudent: (classId, studentId) =>
    axios.delete(`${API_BASE_URL}/classes/${classId}/students/${studentId}`),
};

export const subjectAPI = {
  getAll: (params) => axios.get(`${API_BASE_URL}/subjects`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/subjects/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/subjects`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/subjects/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/subjects/${id}`),
};

export const resourceAPI = {
  getAll: (params) => axios.get(`${API_BASE_URL}/resources`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/resources/${id}`),
  create: (formData) =>
    axios.post(`${API_BASE_URL}/resources`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, data) => axios.put(`${API_BASE_URL}/resources/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/resources/${id}`),
  download: (id) =>
    axios.get(`${API_BASE_URL}/resources/${id}/download`, {
      responseType: 'blob',
    }),
};

export const calendarAPI = {
  getAll: (params) => axios.get(`${API_BASE_URL}/calendar`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/calendar/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/calendar`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/calendar/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/calendar/${id}`),
};
