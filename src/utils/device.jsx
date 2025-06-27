// src/utils/device.js
export function getDeviceId() {
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // generate unique ID per browser/device
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
}
