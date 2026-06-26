import api from './api.js';
import { buildRecordId, getStoredLandRecords, saveStoredLandRecords } from '../utils/storage.js';

const resource = '/lands';

const toFrontendFormat = (doc) => ({
  id: doc._id || doc.id,
  _id: doc._id,
  surveyNumber: doc.surveyNumber || '',
  parcelId: doc.parcelId || '',
  location: doc.location || '',
  village: doc.village || '',
  district: doc.district || '',
  state: doc.state || '',
  area: doc.area || 0,
  ownerName: doc.ownerName || '',
  contactNumber: doc.contactNumber || '',
  address: doc.address || '',
  titleStatus: doc.titleStatus || 'Pending',
  encumbranceStatus: doc.encumbranceStatus || 'Pending',
  legalClearanceStatus: doc.legalClearanceStatus || 'Pending',
  remarks: doc.remarks || '',
  workflowStage: doc.workflowStage || 1,
  createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
});

export const landService = {
  getAll: async () => {
    try {
      const data = await api.get(resource).then((r) => r.data);
      return data.map(toFrontendFormat);
    } catch {
      return getStoredLandRecords();
    }
  },

  getById: async (id) => {
    try {
      const data = await api.get(`${resource}/${id}`).then((r) => r.data);
      return toFrontendFormat(data);
    } catch {
      const records = getStoredLandRecords();
      return records.find((r) => r.id === id) || null;
    }
  },

  create: async (payload) => {
    try {
      const data = await api.post(resource, payload).then((r) => r.data);
      return toFrontendFormat(data);
    } catch {
      const records = getStoredLandRecords();
      const newRecord = { ...payload, id: buildRecordId(records) };
      saveStoredLandRecords([newRecord, ...records]);
      return newRecord;
    }
  },

  update: async (id, payload) => {
    try {
      const data = await api.put(`${resource}/${id}`, payload).then((r) => r.data);
      return toFrontendFormat(data);
    } catch {
      const records = getStoredLandRecords();
      const nextRecords = records.map((r) => (r.id === id || r._id === id ? { ...r, ...payload } : r));
      saveStoredLandRecords(nextRecords);
      return nextRecords.find((r) => r.id === id || r._id === id);
    }
  },

  remove: async (id) => {
    try {
      await api.delete(`${resource}/${id}`);
    } catch {
      const records = getStoredLandRecords();
      saveStoredLandRecords(records.filter((r) => r.id !== id && r._id !== id));
    }
  },
};
