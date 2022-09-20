import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertKanji = payload => api.post(`/kanji`, payload)
export const getAllKanjis = () => api.get(`/kanjis`)
export const updateKanjiById = (id, payload) => api.put(`/kanji/${id}`, payload)
export const deleteKanjiById = id => api.delete(`/kanji/${id}`)
export const getKanjiById = id => api.get(`/kanji/${id}`)

const apis = {
    insertKanji,
    getAllKanjis,
    updateKanjiById,
    deleteKanjiById,
    getKanjiById,
}

export default apis