import {
  doc, setDoc, getDoc, updateDoc, collection,
  addDoc, getDocs, deleteDoc, query, where,
  orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase-config';

// ─── ADMIN ──────────────────────────────────────────────────────────────────
export const ADMIN_EMAIL = 'baradmanik@gmail.com';
export const isAdmin = (email) => email === ADMIN_EMAIL;

// ─── ACTIVITY LOGGING ────────────────────────────────────────────────────────
export async function logActivity(userId, email, action, details = '') {
  try {
    await addDoc(collection(db, 'activity_logs'), {
      userId,
      email,
      action,
      details,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Activity log failed:', err);
  }
}

// ─── USERS COLLECTION ────────────────────────────────────────────────────────
export async function createUserProfile(userId, data) {
  await setDoc(doc(db, 'users', userId), {
    name: data.name || '',
    email: data.email || '',
    age: data.age || null,
    preferredLanguage: data.preferredLanguage || 'english',
    fontSize: data.fontSize || 'medium',
    voiceAssistEnabled: data.voiceAssistEnabled || false,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(userId) {
  const snap = await getDoc(doc(db, 'users', userId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateUserProfile(userId, data) {
  await updateDoc(doc(db, 'users', userId), { ...data });
}

// ─── MEDICINES COLLECTION ────────────────────────────────────────────────────
export async function addMedicine(data) {
  return await addDoc(collection(db, 'medicines'), {
    name: data.name || '',
    barcode: data.barcode || '',
    dosage: data.dosage || '',
    usageInstructions: data.usageInstructions || '',
    sideEffects: data.sideEffects || '',
    precautions: data.precautions || '',
    simpleExplanation: data.simpleExplanation || '',
    createdAt: serverTimestamp(),
  });
}

export async function getMedicineByBarcode(barcode) {
  const q = query(collection(db, 'medicines'), where('barcode', '==', barcode));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function getAllMedicines() {
  const snap = await getDocs(collection(db, 'medicines'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── REMINDERS COLLECTION ────────────────────────────────────────────────────
export async function addReminder(userId, data) {
  return await addDoc(collection(db, 'reminders'), {
    userId,
    medicineName: data.medicineName || '',
    dosage: data.dosage || '',
    frequency: data.frequency || '',
    time: data.time || '',
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserReminders(userId) {
  const q = query(
    collection(db, 'reminders'),
    where('userId', '==', userId)
  );
  const snap = await getDocs(q);
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return data.sort((a, b) => {
    const timeA = a.createdAt?.seconds || 0;
    const timeB = b.createdAt?.seconds || 0;
    return timeB - timeA;
  });
}

export async function deleteReminder(reminderId) {
  await deleteDoc(doc(db, 'reminders', reminderId));
}

// ─── HISTORY COLLECTION ──────────────────────────────────────────────────────
export async function addHistory(userId, data) {
  return await addDoc(collection(db, 'history'), {
    userId,
    medicineName: data.medicineName || '',
    dosage: data.dosage || '',
    status: data.status || 'taken',   // 'taken' | 'missed'
    takenAt: serverTimestamp(),
  });
}

export async function getUserHistory(userId) {
  const q = query(
    collection(db, 'history'),
    where('userId', '==', userId)
  );
  const snap = await getDocs(q);
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return data.sort((a, b) => {
    const timeA = a.takenAt?.seconds || 0;
    const timeB = b.takenAt?.seconds || 0;
    return timeB - timeA;
  });
}

// ─── ADMIN: ALL ACTIVITY LOGS ─────────────────────────────────────────────────
export async function getAllActivityLogs() {
  const q = query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─── ADMIN: ALL USERS ─────────────────────────────────────────────────────────
export async function getAllUsers() {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
