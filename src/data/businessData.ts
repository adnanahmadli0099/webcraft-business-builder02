export interface OfficeLocation {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  subway: string;
  parking: string;
  hours: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  isPrimary?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'personal-care' | 'specialty' | 'programs' | 'nursing';
  image: string;
  keyFeatures: string[];
  eligibleWho: string;
  coveredTasks: string[];
  insuranceAccepted: string[];
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  relation: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  serviceReceived: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'cdpap' | 'insurance' | 'caregivers';
  question: string;
  answer: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'care' | 'team' | 'nhtd' | 'facilities';
}

export const BUSINESS_INFO = {
  name: 'HouseCalls Home Care',
  legalName: 'House Calls Home Care Services Inc.',
  type: 'New York State Licensed Home Care Services Agency (LHCSA)',
  tagline: 'Compassionate, Bilingual In-Home Health Care You Can Trust Across New York',
  phone: '(718) 922-9200',
  phoneClean: '17189229200',
  customerServiceExt: 'Ext. 815',
  emergencyLine: '(718) 922-9200 (Press 1 for 24/7 On-Call Coordinator)',
  whatsappNumber: '17189229200',
  whatsappUrl: 'https://wa.me/17189229200?text=Hello%20HouseCalls%20Home%20Care,%20I%20would%20like%20to%20inquire%20about%20home%20care%20services.',
  emails: {
    general: 'info@housecallshc.org',
    customerService: 'cs@housecallshc.org',
    careers: 'hr@housecallshc.org',
    compliance: 'compliance@housecallshc.org',
  },
  hours: {
    office: 'Monday – Friday: 9:00 AM – 5:00 PM',
    caregiving: '24 Hours / 7 Days a Week / 365 Days a Year',
  },
  foundedYear: 2010,
  yearsInService: 14,
  ratings: {
    score: 4.8,
    reviewCount: 638,
    bbbGrade: 'A+',
    recommendationRate: '98%',
  },
  primaryGoogleMapsUrl: 'https://maps.app.goo.gl/wEx8WPajNkzemzDg8',
  languages: ['English', 'Español (Spanish)', 'Русский (Russian)', 'Kreyòl Ayisyen (Creole)', '中文 (Cantonese & Mandarin)', 'বাংলা (Bengali)', 'Oʻzbekcha (Uzbek)'],
  serviceAreas: [
    { name: 'Brooklyn', desc: 'East Flatbush, Sunset Park, Crown Heights, Bed-Stuy, Bay Ridge, Coney Island & all neighborhoods' },
    { name: 'Queens', desc: 'Flushing, Jamaica, Astoria, Forest Hills, Jackson Heights, Elmhurst' },
    { name: 'Manhattan', desc: 'Harlem, Upper East Side, Lower Manhattan, Midtown, Washington Heights' },
    { name: 'The Bronx', desc: 'South Bronx, Riverdale, Pelham Bay, Throggs Neck' },
    { name: 'Staten Island', desc: 'St. George, Todt Hill, Great Kills, Tottenville' },
    { name: 'Long Island & Westchester', desc: 'Nassau County, Western Suffolk County, Yonkers, Mount Vernon' },
  ],
  insurances: [
    'New York State Medicaid',
    'Managed Long-Term Care (MLTC) Plans',
    'Fidelis Care / Wellcare',
    'Healthfirst Managed Care',
    'MetroPlus Health Plan',
    'VNS Health MLTC',
    'Centene / Fidelis',
    'Senior Whole Health',
    'Medicare Advantage Plans (Select coverage)',
    'Long-Term Care Insurance (Private)',
    'Private Pay Options',
  ],
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'church-ave',
    name: 'East Flatbush Main Office',
    neighborhood: 'East Flatbush / Crown Heights',
    address: '4920 Church Ave',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11203',
    phone: '(718) 922-9200',
    subway: 'Subway: 2/5 train to Church Ave station, then B35 / B46 bus',
    parking: 'Street parking along Church Ave & Utica Ave',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM',
    isPrimary: true,
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.671569472621!2d-73.93326622357778!3d40.65155184206584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b080b56a8dd%3A0xe215f3889a33f028!2sHouse%20Calls%20Home%20Care!5e0!3m2!1sen!2sus!4v1711000000000!5m2!1sen!2sus',
    googleMapsUrl: 'https://maps.app.goo.gl/wEx8WPajNkzemzDg8',
  },
  {
    id: 'fulton-st',
    name: 'Bed-Stuy / East New York Office',
    neighborhood: 'Bedford-Stuyvesant / East New York',
    address: '1950 Fulton St',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11233',
    phone: '(718) 922-9200',
    subway: 'Subway: A/C train to Utica Ave or Ralph Ave station, then short walk',
    parking: 'Metered street parking and nearby public parking lots',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.291739564243!2d-73.92378222357531!3d40.67846543886566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25c6f0ab16597%3A0x3658e713d08f967b!2s1950%20Fulton%20St%2C%20Brooklyn%2C%20NY%2011233!5e0!3m2!1sen!2sus!4v1711000000000!5m2!1sen!2sus',
    googleMapsUrl: 'https://www.google.com/maps/place/1950+Fulton+St,+Brooklyn,+NY+11233',
  },
  {
    id: 'sunset-park',
    name: 'Sunset Park Office (Multilingual Hub)',
    neighborhood: 'Sunset Park / Bay Ridge',
    address: '5803 8th Ave',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11220',
    phone: '(718) 922-9200',
    subway: 'Subway: N train to Fort Hamilton Pkwy or R train to 59th St station',
    parking: 'Street parking available throughout 8th Avenue business corridor',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.932986475355!2d-74.00843222357904!3d40.63852184376517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25ab7ce18e959%3A0x8fcad3b81121d5c2!2s5803%208th%20Ave%2C%20Brooklyn%2C%20NY%2011220!5e0!3m2!1sen!2sus!4v1711000000000!5m2!1sen!2sus',
    googleMapsUrl: 'https://www.google.com/maps/place/5803+8th+Ave,+Brooklyn,+NY+11220',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'cdpap',
    title: 'CDPAP (Consumer Directed Personal Assistance)',
    shortDesc: 'A New York Medicaid program that allows patients to recruit, hire, and direct their own caregivers—including family members and friends who get paid competitive hourly wages.',
    fullDesc: 'The Consumer Directed Personal Assistance Program (CDPAP) empowers Medicaid recipients needing in-home assistance with activities of daily living or skilled nursing to hire personal assistants of their choosing. You do not need a special license—children, siblings, relatives, and trusted friends can receive compensation while caring for their loved ones. HouseCalls acts as your certified Fiscal Intermediary, handling payroll, tax withholdings, and compliance support smoothly.',
    category: 'programs',
    image: '/assets/2150494633.jpg',
    badge: 'Most Popular Medicaid Benefit',
    keyFeatures: [
      'Hire your daughter, son, relative, or friend as paid caregiver',
      'No formal medical license or HHA certificate required for your assistant',
      'Flexible scheduling determined directly by you and your assistant',
      'Competitive weekly pay rates + direct deposit through HouseCalls',
      'Full intake, Medicaid eligibility assistance, and physician orders coordination',
    ],
    eligibleWho: 'New York Medicaid recipients needing help with everyday activities (ADLs) or health maintenance, capable of directing care or having a designated representative.',
    coveredTasks: [
      'Bathing, grooming, and personal hygiene',
      'Meal prep, cooking, and special diet compliance',
      'Medication administration & prompts',
      'Transferring, walking assistance, and mobility support',
      'Light housekeeping, laundry, grocery shopping, doctor visit accompaniment',
    ],
    insuranceAccepted: ['NYS Medicaid', 'MLTC Plans', 'Fidelis', 'Healthfirst', 'MetroPlus', 'VNS Health'],
  },
  {
    id: 'personal-care-hha-pca',
    title: 'Personal Care & Home Health Aides (HHA / PCA)',
    shortDesc: 'Certified, background-checked, and compassionate aides who assist seniors and individuals with physical limitations to thrive safely in the comfort of home.',
    fullDesc: 'Our certified Home Health Aides (HHA) and Personal Care Aides (PCA) deliver one-on-one assistance tailored to your loved one’s unique lifestyle. Whether you need 4 hours a day or 24/7 live-in support, our aides are thoroughly vetted, trained in infection control, dementia care, and fall prevention, and matched based on personality and native language preferences.',
    category: 'personal-care',
    image: '/assets/20762.jpg',
    badge: 'NYS Certified Caregivers',
    keyFeatures: [
      '100% NYS Certified, background-checked, and insured caregivers',
      'Bilingual caregivers matched to your cultural and language preferences',
      'Registered Nurse (RN) regular supervisory visits and care plan audits',
      'Flexible shifts: 4-hour morning/evening blocks, 12-hour shifts, or 24/7 live-in care',
      'Emergency caregiver backup coverage with 24/7 on-call dispatch',
    ],
    eligibleWho: 'Seniors, recovering post-surgical patients, or individuals of any age who require physical support with daily routines.',
    coveredTasks: [
      'Assistance with showering, bathing, and hair/skin care',
      'Safe transfer assistance (bed to wheelchair, walker support)',
      'Incontinence care, toileting, and linen changes',
      'Preparation of fresh, culturally appropriate meals',
      'Medication reminders and vital signs observation',
      'Companionship, mental engagement, and accompanied outdoor walks',
    ],
    insuranceAccepted: ['Medicaid / MLTC', 'Long-Term Care Insurance', 'Private Pay', 'Medicare Advantage (Select)'],
  },
  {
    id: 'nhtd-waiver',
    title: 'NHTD & TBI Medicaid Waiver Programs',
    shortDesc: 'Statewide waiver initiatives enabling seniors and individuals with Traumatic Brain Injury to avoid nursing home placement and live with dignity in their community.',
    fullDesc: 'The Nursing Home Transition and Diversion (NHTD) and Traumatic Brain Injury (TBI) Waiver programs use Medicaid funding to provide comprehensive community-based services to qualified individuals. HouseCalls Home Care is an authorized waiver service provider helping clients transition safely out of nursing facilities back into home settings, or preventing unnecessary institutionalization altogether.',
    category: 'programs',
    image: '/assets/img_nhtd1.png',
    badge: 'Official NYS Waiver Provider',
    keyFeatures: [
      'Comprehensive Home and Community Support Services (HCSS)',
      'Service Coordination to navigate housing, medical care, and community resources',
      'Independent Living Skills Training (ILST) to restore self-sufficiency',
      'Home environmental modifications and assistive technology acquisition',
      'Dedicated Waiver Service Facilitator assigned to your family',
    ],
    eligibleWho: 'New York residents eligible for nursing home level of care who prefer to live safely at home and hold active Medicaid coverage.',
    coveredTasks: [
      'HCSS in-home attendant care for daily stabilization',
      'Community integration and socialization support',
      'Behavioral interventions and cognitive skill retraining for TBI',
      'Assistance with budgeting, medical appointment scheduling, and transport',
      'Transition coordination from nursing homes back to private apartments',
    ],
    insuranceAccepted: ['New York State Medicaid NHTD Waiver', 'TBI Waiver Program'],
  },
  {
    id: 'skilled-nursing',
    title: 'Skilled Nursing Visits (RN & LPN)',
    shortDesc: 'Clinical in-home healthcare provided by licensed Registered Nurses and Practical Nurses under strict physician direction.',
    fullDesc: 'For patients with complex medical conditions, recovery from acute illness, or chronic illness flare-ups, our skilled nursing division bridges the hospital-to-home transition. Registered Nurses develop individualized clinical plans, liaise with your primary physician, and administer treatments right in the comfort of your living room.',
    category: 'nursing',
    image: '/assets/20662.jpg',
    keyFeatures: [
      'Licensed Registered Nurses (RN) and Licensed Practical Nurses (LPN)',
      'Clinical coordination with your hospital discharge planners & physicians',
      'Routine vitals, glucose, and cardiopulmonary monitoring',
      'Wound care, dressing changes, and sterile wound vacuum management',
      'Patient and family education regarding chronic disease management',
    ],
    eligibleWho: 'Individuals with active medical orders requiring clinical assessment, wound treatment, or complex injection/catheter therapies.',
    coveredTasks: [
      'Comprehensive nursing assessments and vital sign analysis',
      'Wound debridement, sterile dressing changes, and ulcer staging',
      'Insulin administration, diabetic foot care, and monitoring',
      'IV therapy management and intramuscular/subcutaneous injections',
      'Catheter insertion, ostomy care, and feeding tube maintenance',
      'Caregiver education on post-discharge emergency signs',
    ],
    insuranceAccepted: ['Medicaid / MLTC', 'Select Medicare Advantage Plans', 'Private Insurance', 'Private Pay'],
  },
  {
    id: 'dementia-alzheimers',
    title: 'Dementia & Alzheimer’s Memory Care',
    shortDesc: 'Specialized memory support emphasizing calm routines, cognitive stimulation, dignity, and fall prevention for neurocognitive disorders.',
    fullDesc: 'Caring for a loved one with Alzheimer’s or dementia requires extraordinary patience, specialized communication skills, and safety awareness. Our memory care aides receive continuous training in de-escalation techniques, wander-prevention protocols, and gentle sensory activities that preserve dignity while easing the burden on family members.',
    category: 'specialty',
    image: '/assets/2150780370.jpg',
    keyFeatures: [
      'Caregivers trained in validating communication and Alzheimer’s behavioral stages',
      'Home safety assessment to identify fall risks, wandering exits, and hazards',
      'Structured daily schedules to reduce evening agitation (sundowning)',
      'Memory albums, music engagement, and reminiscence therapy',
      'Respite support for family caregivers to prevent caregiver burnout',
    ],
    eligibleWho: 'Individuals diagnosed with early, moderate, or advanced Alzheimer’s disease, Lewy body dementia, vascular dementia, or related cognitive impairments.',
    coveredTasks: [
      'Continuous supervision and wandering redirection',
      'Gentle guidance through bathing, dressing, and personal hygiene',
      'Hydration tracking and nutritious finger-food preparation',
      'Medication administration vigilance',
      'Safe accompaniment on therapeutic walks and doctor visits',
    ],
    insuranceAccepted: ['Medicaid / MLTC', 'Long-Term Care Insurance', 'Private Pay'],
  },
  {
    id: 'respite-companion',
    title: 'Companion Care & Family Respite',
    shortDesc: 'Warm social companionship, light housekeeping, and planned respite relief for primary family caregivers to rest and recharge.',
    fullDesc: 'Family caregivers dedicate their hearts to loved ones, but self-care is essential. Our companion and respite services offer family members peace of mind knowing their loved one is in safe, caring hands while they work, travel, or attend to personal responsibilities.',
    category: 'personal-care',
    image: '/assets/18054-2.jpg',
    keyFeatures: [
      'Flexible hourly blocks from 3 hours to overnight coverage',
      'Friendly conversational companionship, board games, and reading',
      'Light housekeeping: dishwashing, laundry, and tidy living areas',
      'Escort to grocery stores, senior centers, places of worship, and appointments',
      'Reduces senior isolation and feelings of loneliness',
    ],
    eligibleWho: 'Seniors living alone seeking friendly companionship or family caregivers in need of reliable respite breaks.',
    coveredTasks: [
      'Meaningful conversations, card games, and hobby assistance',
      'Preparation of fresh lunches and dinners',
      'Errand running, pharmacy pickups, and grocery shopping',
      'Light tidying and bed-making',
      'Accompaniment to religious services and social clubs',
    ],
    insuranceAccepted: ['Medicaid / MLTC', 'Private Pay', 'Long-Term Care Insurance'],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    author: 'Miriam S.',
    relation: 'Daughter of Care Recipient',
    location: 'Crown Heights, Brooklyn',
    rating: 5,
    date: 'Verified Review (Google Maps)',
    text: 'HouseCalls Home Care has been an absolute blessing for our family. When my 84-year-old mother had hip surgery, we were terrified she would have to go to a rehabilitation facility far away. HouseCalls arranged a wonderful aide within 48 hours who speaks my mother’s native language. The RN came every two weeks to check vitals. Mom is thriving at home!',
    serviceReceived: 'Personal Care & HHA',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Darnell W.',
    relation: 'Family Caregiver',
    location: 'East Flatbush, Brooklyn',
    rating: 5,
    date: 'Verified Review (Birdeye)',
    text: 'I switched to HouseCalls for the CDPAP program so I could take care of my father full-time. Their coordinators at the Church Ave office walked me through every Medicaid document. My weekly direct deposits are always on time, and their customer service answers the phone right away whenever I need something.',
    serviceReceived: 'CDPAP Medicaid Program',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Elena K.',
    relation: 'Family Member',
    location: 'Sunset Park, Brooklyn',
    rating: 5,
    date: 'Verified Review (Google Maps)',
    text: 'The Sunset Park office staff is extremely kind and professional. They helped my grandmother transition from hospital discharge smoothly. Finding a Russian-speaking caregiver who treated her with such warmth and respect made all the difference in the world.',
    serviceReceived: 'Skilled Nursing & HHA',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Marcus B.',
    relation: 'Son & Primary Caregiver',
    location: 'Bedford-Stuyvesant, Brooklyn',
    rating: 5,
    date: 'Verified Review',
    text: 'HouseCalls helped us navigate the NHTD waiver program when another agency gave us the runaround for three months. Their waiver coordinator knew the exact NYS Department of Health requirements and secured our approvals quickly. Highly recommended!',
    serviceReceived: 'NHTD Waiver Services',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Patricia L.',
    relation: 'Wife of Veteran',
    location: 'Bay Ridge, Brooklyn',
    rating: 5,
    date: 'Verified Review',
    text: 'My husband has severe dementia and was prone to wandering. The caregiver from HouseCalls has special dementia training and knows exactly how to keep him calm and engaged. I finally have peace of mind when running errands.',
    serviceReceived: 'Memory & Dementia Care',
    verified: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'How quickly can home care services begin?',
    answer: 'In most urgent cases, we can complete an initial in-home clinical assessment by a Registered Nurse and place a certified caregiver within 24 to 48 hours. For Medicaid and MLTC authorizations, our intake coordinators handle all physician paperwork and plan clearances directly with your insurance to expedite start of care.',
  },
  {
    id: 'faq-2',
    category: 'cdpap',
    question: 'What is the CDPAP program, and who can get paid to be a caregiver?',
    answer: 'The Consumer Directed Personal Assistance Program (CDPAP) is a New York Medicaid benefit that allows eligible individuals to hire family members (such as adult children, grandchildren, siblings, or in-laws) or trusted friends as their paid personal assistants. The only family member legally prohibited from being paid under NYS law is a legally married spouse or a designated healthcare proxy. Assistants do not need a medical license; HouseCalls provides training and handles payroll.',
  },
  {
    id: 'faq-3',
    category: 'insurance',
    question: 'Does Medicaid or Medicare pay for home care?',
    answer: 'New York State Medicaid (through Managed Long-Term Care plans) covers long-term personal care, HHA, and CDPAP services at $0 out-of-pocket cost for eligible recipients. Traditional Medicare covers short-term, intermittent skilled nursing and therapy following an acute hospitalization, but does not cover ongoing personal custodial care. We also accept long-term care insurance and private payment.',
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'Are HouseCalls caregivers licensed, background checked, and insured?',
    answer: 'Yes. As a Licensed Home Care Services Agency (LHCSA) regulated by the New York State Department of Health, all HouseCalls caregivers undergo rigorous background checks, statewide criminal registry clearance, health screenings, drug testing, and reference verification. All caregivers are fully bonded and insured.',
  },
  {
    id: 'faq-5',
    category: 'caregivers',
    question: 'Can we request a caregiver who speaks our language?',
    answer: 'Absolutely! Our team is deeply rooted in Brooklyn’s diverse communities. We have caregivers and office coordinators fluent in Spanish, Russian, Haitian Creole, Cantonese, Mandarin, Bengali, Uzbek, and English. We ensure both linguistic and cultural compatibility.',
  },
  {
    id: 'faq-6',
    category: 'insurance',
    question: 'What if we already have an agency and want to transfer to HouseCalls?',
    answer: 'Transferring to HouseCalls is quick and completely hassle-free. Our intake department coordinates directly with your current MLTC plan or waiver manager to handle the paperwork transfer without any lapse in your hours or caregiver pay.',
  },
  {
    id: 'faq-7',
    category: 'cdpap',
    question: 'How much are CDPAP caregivers paid, and how often?',
    answer: 'CDPAP assistants receive competitive hourly wages that comply with New York City wage parity regulations, along with options for direct deposit, sick time, and benefits. Pay is disbursed weekly on a consistent schedule.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 'gal-1', url: '/assets/20762.jpg', caption: 'Certified HHA assisting an elderly client safely at home in Brooklyn', category: 'care' },
  { id: 'gal-2', url: '/assets/20662.jpg', caption: 'Registered Nurse performing routine vital signs and wellness check', category: 'care' },
  { id: 'gal-3', url: '/assets/18054-2.jpg', caption: 'Compassionate companion care and medication management routine', category: 'care' },
  { id: 'gal-4', url: '/assets/2150321573.jpg', caption: 'Senior couple enjoying independence and quality of life at home', category: 'care' },
  { id: 'gal-5', url: '/assets/30583.jpg', caption: 'Care coordination and individualized in-home care plan consultation', category: 'team' },
  { id: 'gal-6', url: '/assets/363498.jpg', caption: 'In-home mobility and physical rehabilitation support', category: 'care' },
  { id: 'gal-7', url: '/assets/2150780370.jpg', caption: 'Specialized dementia memory care and interactive engagement', category: 'care' },
  { id: 'gal-8', url: '/assets/2150494633.jpg', caption: 'Multi-generational family supported through the NYS CDPAP program', category: 'care' },
  { id: 'gal-9', url: '/assets/img_nhtd1.png', caption: 'NHTD Waiver community transition support and living skills training', category: 'nhtd' },
  { id: 'gal-10', url: '/assets/img_nhtd3.png', caption: 'Comprehensive community integration and independence initiatives', category: 'nhtd' },
];
