import { initialLandRecords } from './mockData.js';

const LAND_RECORDS_KEY = 'crownridge_land_records';

export function getStoredLandRecords() {
  const stored = localStorage.getItem(LAND_RECORDS_KEY);
  if (!stored) {
    localStorage.setItem(LAND_RECORDS_KEY, JSON.stringify(initialLandRecords));
    return initialLandRecords;
  }
  return JSON.parse(stored);
}

export function saveStoredLandRecords(records) {
  localStorage.setItem(LAND_RECORDS_KEY, JSON.stringify(records));
}

export function buildRecordId(records) {
  return `LR-${1001 + records.length}`;
}
