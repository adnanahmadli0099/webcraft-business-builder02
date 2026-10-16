export interface ConsultationRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  careNeededFor: string;
  serviceRequested: string;
  borough: string;
  hasMedicaid: 'yes' | 'no' | 'unsure';
  preferredDate: string;
  notes: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  office: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface JobApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  position: 'HHA' | 'PCA' | 'RN' | 'LPN' | 'Care Coordinator';
  experienceYears: string;
  languages: string[];
  hasCertificate: boolean;
  notes: string;
  createdAt: string;
  status: 'pending' | 'interview_scheduled' | 'archived';
}

const STORAGE_KEYS = {
  CONSULTATIONS: 'housecalls_consultations_v1',
  MESSAGES: 'housecalls_messages_v1',
  APPLICATIONS: 'housecalls_applications_v1',
};

const DEFAULT_CONSULTATIONS: ConsultationRequest[] = [
  {
    id: 'req-101',
    fullName: 'David Robinson',
    phone: '(347) 555-0192',
    email: 'd.robinson@example.com',
    relationship: 'Son',
    careNeededFor: 'Mother (Age 82, recently discharged from Kings County Hospital)',
    serviceRequested: 'Personal Care & HHA',
    borough: 'Brooklyn (East Flatbush)',
    hasMedicaid: 'yes',
    preferredDate: '2026-10-18',
    notes: 'Needs daily assistance with bathing and meals. Prefer a caregiver who speaks Haitian Creole.',
    status: 'new',
    createdAt: '2026-10-15T14:30:00Z',
  },
  {
    id: 'req-102',
    fullName: 'Maria Rodriguez',
    phone: '(917) 555-8321',
    email: 'm.rodriguez@example.com',
    relationship: 'Daughter',
    careNeededFor: 'Father (Age 76, diabetic with mobility impairment)',
    serviceRequested: 'CDPAP (Consumer Directed)',
    borough: 'Brooklyn (Sunset Park)',
    hasMedicaid: 'yes',
    preferredDate: '2026-10-19',
    notes: 'Interested in getting enrolled so I can be his paid caregiver under CDPAP.',
    status: 'contacted',
    createdAt: '2026-10-14T09:15:00Z',
  },
];

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-201',
    name: 'Samuel Thorne',
    email: 'sthorne@brooklynhealth.org',
    phone: '(718) 555-3419',
    office: '4920 Church Ave (East Flatbush)',
    subject: 'Patient Discharge Referral',
    message: 'Hello, I am a discharge social worker at SUNY Downstate. We have a patient requiring 8 hours/day personal care. Could your intake team review her MLTC approval today?',
    status: 'read',
    createdAt: '2026-10-15T11:20:00Z',
  },
];

const DEFAULT_APPLICATIONS: JobApplication[] = [
  {
    id: 'job-301',
    fullName: 'Ketsia Jean-Baptiste',
    phone: '(347) 555-7721',
    email: 'kjeanbaptiste@example.com',
    position: 'HHA',
    experienceYears: '4 years',
    languages: ['English', 'Kreyòl Ayisyen (Creole)', 'French'],
    hasCertificate: true,
    notes: 'Valid NYS HHA certificate, physical exam up to date. Seeking full-time weekday shifts in Crown Heights or Flatbush.',
    createdAt: '2026-10-15T16:45:00Z',
    status: 'interview_scheduled',
  },
];

export function getConsultations(): ConsultationRequest[] {
  if (typeof window === 'undefined') return DEFAULT_CONSULTATIONS;
  const stored = localStorage.getItem(STORAGE_KEYS.CONSULTATIONS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(DEFAULT_CONSULTATIONS));
    return DEFAULT_CONSULTATIONS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_CONSULTATIONS;
  }
}

export function saveConsultation(data: Omit<ConsultationRequest, 'id' | 'status' | 'createdAt'>): ConsultationRequest {
  const all = getConsultations();
  const newItem: ConsultationRequest = {
    ...data,
    id: 'req-' + Date.now(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...all];
  localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(updated));
  return newItem;
}

export function updateConsultationStatus(id: string, status: ConsultationRequest['status']): void {
  const all = getConsultations();
  const updated = all.map(c => (c.id === id ? { ...c, status } : c));
  localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(updated));
}

export function getMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return DEFAULT_MESSAGES;
  const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
    return DEFAULT_MESSAGES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_MESSAGES;
  }
}

export function saveMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
  const all = getMessages();
  const newItem: ContactMessage = {
    ...data,
    id: 'msg-' + Date.now(),
    status: 'unread',
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...all];
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  return newItem;
}

export function updateMessageStatus(id: string, status: ContactMessage['status']): void {
  const all = getMessages();
  const updated = all.map(m => (m.id === id ? { ...m, status } : m));
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
}

export function getApplications(): JobApplication[] {
  if (typeof window === 'undefined') return DEFAULT_APPLICATIONS;
  const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(DEFAULT_APPLICATIONS));
    return DEFAULT_APPLICATIONS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_APPLICATIONS;
  }
}

export function saveApplication(data: Omit<JobApplication, 'id' | 'status' | 'createdAt'>): JobApplication {
  const all = getApplications();
  const newItem: JobApplication = {
    ...data,
    id: 'job-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...all];
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  return newItem;
}
