import axios from 'axios';


const base = 'http://localhost:3000';

export const getAllPerson = () => axios.get(`${base}/person/`);

export const createPerson = (params) => axios.post(`${base}/person/`, params);

export const deletePerson = (params) => axios.delete(`${base}/person/${params.id}`, { params })

